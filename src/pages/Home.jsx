import { Flex, Box, Heading, Text,  Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

export default function Home() {
    return (
        <PageLayout>
            <Flex
                flex="1"
                minH="85vh"
                align="center"
                justify="center"
                position="relative"
                bgImage="url('/photos/home-background.jpg')"
                bgSize="cover"
                bgPos="center"
                bgRepeat="no-repeat"
                width="100%"
            >
                {/* Optional dark overlay for contrast */}
                <Box position="absolute" inset="0" bg="blackAlpha.400" zIndex={0} />

                {/* Centered Text */}
                <Box
                    position="relative"
                    zIndex={1}
                    textAlign="center"
                    color="white"
                    px={6}
                    mt="-50vh" // Moves text higher
                >
                    <Heading
                        mb={3}
                        size="2xl"
                        fontFamily="'Cinzel', serif"
                        fontWeight="100"  // Ensures regular, not bold
                        letterSpacing="widest"  // Expands text width
                        textTransform="uppercase"
                    >
                        Capturing Life’s Moments
                    </Heading>
                    <Text
                        mb={3}
                        fontSize="xl"
                        textTransform="uppercase"
                        fontWeight="100"
                        fontFamily="'Cinzel', serif">
                        Travel, Landscape and much more...
                    </Text>

                    {/* Update button to match Wix "View More" style */}
                    <ChakraLink as={RouterLink} to="/portfolio" style={{ textDecoration: 'none' }}>
                        <Button
                            bg="transparent"
                            border="1px solid white"
                            color="white"
                            fontFamily="'Cinzel', serif"
                            fontWeight="300"
                            fontSize="lg"
                            px={2}
                            py={1}
                            borderRadius="0"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            _hover={{ bg: "white", color: "black" }}
                        >
                            View Portfolio
                        </Button>
                    </ChakraLink>
                </Box>
            </Flex>
        </PageLayout>
    );
}
