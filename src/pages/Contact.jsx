import { useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";

export default function Contact() {
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!subject || !email || !message) {
            toast({
                title: "Error",
                description: "All fields are required!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://ilrkmjtzwc.execute-api.us-east-1.amazonaws.com/prod/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, email, message }),
            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: "Message Sent",
                    description: "Your message has been sent successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setSubject("");
                setEmail("");
                setMessage("");
            } else {
                toast({
                    title: "Error",
                    description: data.error || "Failed to send message",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while sending the message.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageLayout>
            <Flex
                flex="1"
                minH="85vh"
                bgColor="#27272b"
                fontFamily="'Cinzel', serif"
                width="100%"
                align="center"
                justify="center"
            >
                <Box
                    p={8}
                    w={{ base: "90%", md: "700px" }}  // ✅ Wider on desktop, responsive on mobile
                    color="white"
                    bg="blackAlpha.700"
                    borderRadius="md"
                    boxShadow="lg"
                >
                    <Heading size="lg" mb={6} fontFamily="'Cinzel', serif" fontWeight="400">
                        Contact Me
                    </Heading>
                    <Text fontSize="medium" maxW="600px" mx="auto" mb={8} color="white">
                        Need a large print or have a project in mind? Feel free to reach out!
                    </Text>

                    {/* Subject Field */}
                    <FormControl isRequired>
                        <FormLabel>Subject</FormLabel>
                        <Input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fontFamily="EB Garamond"
                            sx={{ textTransform: "none" }}
                        />
                    </FormControl>

                    {/* Email Field */}
                    <FormControl isRequired mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ textTransform: "none" }}
                            fontFamily="EB Garamond"
                        />
                    </FormControl>

                    {/* Message Field */}
                    <FormControl isRequired mt={4}>
                        <FormLabel>Message</FormLabel>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fontFamily="EB Garamond"
                        />
                    </FormControl>

                    <Button
                        mt={6}
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={loading}
                        loadingText="Sending..."
                        w="full"
                    >
                        Send Message
                    </Button>
                </Box>
            </Flex>
        </PageLayout>
    );
}
