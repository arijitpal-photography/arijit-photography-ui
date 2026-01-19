import { useState, useEffect } from "react";
import {
    Box,
    SimpleGrid,
    Image,
    Heading,
    Spinner,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Flex,
    IconButton,
    Text
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Maximize2, Minimize2 } from "lucide-react"; // ✅ Import Maximize & Minimize icons
import PageLayout from "../../layouts/PageLayout";

export default function Patterns() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageTitle, setSelectedImageTitle] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // ✅ Open lightbox with selected image
    const handleOpenLightbox = (index) => {
        setSelectedImage(photos[index].image_url);
        setSelectedImageTitle(photos[index].title);
        setLightboxIndex(index);
        setIsFullScreen(false); // Ensure it starts in normal mode
        onOpen();
    };

    // ✅ Toggle Fullscreen Mode
    const handleToggleFullscreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // ✅ Navigate to Previous Image
    const handlePrev = () => {
        const newIndex = lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1;
        setLightboxIndex(newIndex);
        setSelectedImage(photos[newIndex].image_url);
        setSelectedImageTitle(photos[newIndex].title);
    };

    // ✅ Navigate to Next Image
    const handleNext = () => {
        const newIndex = lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1;
        setLightboxIndex(newIndex);
        setSelectedImage(photos[newIndex].image_url);
        setSelectedImageTitle(photos[newIndex].title);
    };

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await fetch(
                    "https://ilrkmjtzwc.execute-api.us-east-1.amazonaws.com/prod/list?genre=patterns"
                );
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
    }, []);

    return (
        <PageLayout>
            <Box py={16} px={16} bgColor="#27272b" color="white" minH="85vh">
                <Heading
                    size="xl"
                    textAlign="center"
                    mb={10}
                    fontFamily="'Cinzel', serif"
                    fontWeight="100"
                    letterSpacing="wide"
                    textTransform="uppercase"
                >
                    Architecture & Patterns
                </Heading>

                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
                        {photos.map((photo, index) => (
                            <Box
                                key={index}
                                cursor="pointer"
                                onClick={() => handleOpenLightbox(index)}
                                overflow="hidden"
                                borderRadius="md"
                                boxShadow="md"
                            >
                                <Image
                                    src={photo.image_url}
                                    alt={photo.title}
                                    objectFit="cover"
                                    w="100%"
                                    h="200px"
                                    transition="transform 0.3s"
                                    _hover={{ transform: "scale(1.05)" }}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>

            {/* Modal to show enlarged image */}
            <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
                <ModalOverlay />
                <ModalContent
                    bg="#27272b"
                    maxW={isFullScreen ? "100vw" : "4xl"}
                    maxH={isFullScreen ? "100vh" : "auto"}
                    position="relative"
                >
                    {/* ✅ Icons Container (Sticks to Top Corners) */}
                    <Flex
                        justify="space-between"
                        align="center"
                        position="absolute"
                        top={4}
                        left={4}
                        right={4}
                        zIndex="2"
                    >
                        {/* ✅ Maximize / Minimize Button - Top Left */}
                        <IconButton
                            icon={isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />} // ✅ Toggle icon
                            onClick={handleToggleFullscreen}
                            aria-label="Toggle Fullscreen"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.800"
                            _hover={{ bg: "whiteAlpha.200" }}
                        />

                        {/* ✅ Close Button - Top Right (With Border) */}
                        <IconButton
                            onClick={onClose}
                            aria-label="Close"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.800"
                            _hover={{ bg: "whiteAlpha.200" }}
                            icon={<ModalCloseButton position="static" color="white" />}
                        />
                    </Flex>

                    {/* ✅ Enlarged Image with Fullscreen Support */}
                    <ModalBody display="flex" justifyContent="center" alignItems="center" p={4}>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                maxH={isFullScreen ? "100vh" : "80vh"} // ✅ Image maximizes properly
                                maxW={isFullScreen ? "100vw" : "auto"}
                                objectFit="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        )}
                    </ModalBody>

                    {/* ✅ Navigation Controls */}
                    <Flex justify="space-between" align="center" px={6} pb={6}>
                        <IconButton
                            icon={<ArrowLeftIcon />}
                            onClick={handlePrev}
                            aria-label="Previous"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.800"
                            _hover={{ bg: "whiteAlpha.200" }}
                        />
                        <Box mt={2} textAlign="center"
                             fontFamily="'Cinzel', serif"
                             fontWeight="100"
                             letterSpacing="wider"
                             textTransform="uppercase"
                             color="white">
                            <Text fontSize="lg" fontWeight="bold">
                                {selectedImageTitle}
                            </Text>
                        </Box>
                        <IconButton
                            icon={<ArrowRightIcon />}
                            onClick={handleNext}
                            aria-label="Next"
                            variant="outline"
                            color="white"
                            borderColor="whiteAlpha.800"
                            _hover={{ bg: "whiteAlpha.200" }}
                        />
                    </Flex>
                </ModalContent>
            </Modal>
        </PageLayout>
    );
}

