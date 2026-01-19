import { Box, Heading, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

export default function Portfolio() {
    // Example categories. Each has a `name`, a thumbnail `src`, and a `link` path
    const categories = [
        {
            name: "Landscape",
            src: "/photos/landscape-thumb.jpg",
            link: "/portfolio/landscape",
        },
        {
            name: "Wildlife",
            src: "/photos/wildlife-thumb.jpg",
            link: "/portfolio/wildlife",
        },
        {
            name: "Cities",
            src: "/photos/cities-thumb.jpg",
            link: "/portfolio/cityscape",
        },
        {
            name: "Travel",
            src: "/photos/travel-thumb.jpg",
            link: "/portfolio/travel",
        },
        {
            name: "Aerials",
            src: "/photos/aerials-thumb.jpg",
            link: "/portfolio/aerials",
        },
        {
            name: "Architecture and Patterns",
            src: "/photos/patterns-thumb.jpg",
            link: "/portfolio/patterns",
        }
    ];

    return (
        <PageLayout>
            <Box
                flex="1"
                minH="85vh"
                bgColor="#27272b"
                fontFamily="'Cinzel', serif"
                color="white"
                px={{ base: 4, md: 16 }}
                py={16}
            >
                <Heading
                    size="xl"
                    textAlign="center"
                    mb={10}
                    fontWeight="100"
                    fontFamily="'Cinzel', serif"
                    letterSpacing="widest"
                    textTransform="uppercase"
                >
                    My Portfolio
                </Heading>

                {/* Categories Grid */}
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
                    {categories.map((cat) => (
                        <Box
                            key={cat.name}
                            as={RouterLink}
                            to={cat.link}
                            cursor="pointer"
                            textAlign="center"
                            _hover={{ opacity: 0.8 }}
                        >
                            <Image
                                src={cat.src}
                                alt={cat.name}
                                objectFit="cover"
                                w="100%"
                                h="200px"
                                borderRadius="md"
                                mb={2}
                            />
                            <Text fontSize="lg" fontWeight="light" textTransform="uppercase">
                                {cat.name}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </PageLayout>
    );
}
