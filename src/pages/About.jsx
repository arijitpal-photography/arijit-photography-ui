import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import PageLayout from "../layouts/PageLayout";

export default function About() {
    return (
        <PageLayout>
            <Flex
                flex="1"
                minH="85vh"
                bgColor="#27272b"
                color="white"
                fontFamily="'Cinzel', serif"
                px={{ base: 8, md: 16 }}    // Overall horizontal padding
                py={{ base: 8, md: 16 }}    // Overall vertical padding
                gap={{ base: 8, md: 4 }}    // Reduced gap between image & text
                direction={{ base: "column", md: "row" }}
                width="100%"
                align={{ base: "flex-start", md: "flex-start" }}
            >
                {/* LEFT: Image (30% on md+) */}
                <Box
                    flex={{ base: "none", md: "0 0 30%" }}
                    display="flex"
                    justifyContent={{ base: "center", md: "flex-start" }}
                    alignItems={{ base: "center", md: "flex-start" }}
                    px={{ base: 9, md: 16 }}
                >
                    <Image
                        src="/photos/your-photo.jpg"
                        alt="Arijit Photography"
                        boxSize="250px"
                        borderRadius="full"
                        objectFit="cover"
                        shadow="lg"
                    />
                </Box>

                {/* RIGHT: Text content (70% on md+) with right padding */}
                <Box
                    flex={{ base: "none", md: "0 0 70%" }}
                    pr={{ base: 0, md: 8 }}  // Add padding on the right
                >
                    {/* Title */}
                    <Heading
                        size="2xl"
                        mb={6}
                        letterSpacing="widest"
                        fontWeight="400"
                        textAlign="center"
                        textTransform="uppercase"
                        fontFamily="'Cinzel', serif"
                    >
                        Welcome to the World Through My Lens
                    </Heading>

                    {/* Intro Paragraph */}
                    <Text fontSize="lg" mb={4} lineHeight="tall">
                        I’m Arijit, a software engineer by profession and a passionate travel
                        photographer at heart. My journey behind the camera is driven by an
                        insatiable curiosity for the world—its landscapes, cultures, and
                        untold stories. Photography, for me, is more than just capturing
                        moments; it’s about preserving emotions, unraveling narratives, and
                        sharing perspectives that transcend borders.
                    </Text>

                    <Text fontSize="lg" mb={4} lineHeight="tall">
                        From the raw beauty of nature to the grandeur of city skylines,
                        from the serenity of landscapes to the vibrancy of wildlife, I
                        embrace multiple genres, each offering a unique way to see and feel
                        the world. My work has been recognized globally, earning awards from
                        more than 20 countries and being exhibited in over 35. Prestigious
                        institutions like the Photography Society of America (PSA), the
                        International Federation of Photographic Art (FIAP), and the Global
                        Photographic Union (GPU) have honored my contributions to the art.
                    </Text>

                    {/* Distinctions & Recognitions */}
                    <Heading size="md"
                             mb={4}
                             fontWeight="bold"
                             textAlign="left"
                             textTransform="uppercase"
                             fontFamily="'Cinzel', serif">
                        Distinctions &amp; Recognitions:
                    </Heading>

                    <Box mb={6}>
                        <List spacing={3}>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color="gray.300" />
                                <Text as="span" fontWeight="semibold">
                                    EFIAP
                                </Text>{" "}
                                – International Federation of Photographic Art (FIAP)
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color="gray.300" />
                                <Text as="span" fontWeight="semibold">
                                    PPSA
                                </Text>{" "}
                                – Photographic Society of America (PSA)
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color="gray.300" />
                                <Text as="span" fontWeight="semibold">
                                    GPU Crown 2
                                </Text>{" "}
                                – Global Photographic Union
                            </ListItem>
                            <ListItem>
                                <ListIcon as={CheckCircleIcon} color="gray.300" />
                                <Text as="span" fontWeight="semibold">
                                    GPU VIP 1
                                </Text>{" "}
                                – Global Photographic Union
                            </ListItem>
                        </List>
                    </Box>

                    <Text fontSize="lg" mb={4} lineHeight="tall">
                        Through this website, I invite you to embark on a visual
                        expedition—where every image tells a story, every frame is a memory,
                        and every destination is an inspiration.
                    </Text>

                    <Text fontSize="lg" mb={4} lineHeight="tall" fontWeight="bold">
                        Let’s explore the world together, one photograph at a time.
                    </Text>
                </Box>
            </Flex>
        </PageLayout>
    );
}
