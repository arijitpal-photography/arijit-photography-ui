import {
    Box,
    Flex,
    Image,
    IconButton,
    Link as ChakraLink,
    useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";

export default function Header() {
    const { isOpen, onToggle } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box bg="white" zIndex="5">
            <Flex
                as="header"
                align="center"
                justify="space-between"
                px={3}
                py={0}  // Minimal padding to keep header narrow
                bgColor="blackAlpha.900"
                fontFamily="'Cinzel', serif"
                fontWeight="400"
                textTransform="uppercase"
            >
                <Image
                    src="/photos/website-logo.png"
                    height="70px" // Adjusted size for better visibility without increasing header height
                    objectFit="contain"
                />
                {!isMobile && (
                    <Flex as="nav" gap={9} align="center">
                        <ChakraLink as={Link} to="/" _hover={{ textDecoration: "underline" }} color="white">
                Home
            </ChakraLink>
            <ChakraLink as={Link} to="/portfolio" _hover={{ textDecoration: "underline" }} color="white">
                Portfolio
            </ChakraLink>
            <ChakraLink as={Link} to="/about" _hover={{ textDecoration: "underline" }} color="white">
                About
            </ChakraLink>
            <ChakraLink as={Link} to="/contact" _hover={{ textDecoration: "underline" }} color="white">
                Contact
            </ChakraLink>
        </Flex>
    )}

{isMobile && (
    <IconButton
        aria-label="Toggle Menu"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onToggle}
        color="white"
    />
)}
</Flex>

{/* Slide-down mobile menu */}
{isMobile && isOpen && (
    <Box bg="blackAlpha.900" px={6} py={4} boxShadow="md" fontFamily="'Cinzel', serif" fontWeight="400">
        <Flex direction="column" gap={4}>
            <ChakraLink as={Link} to="/" onClick={onToggle} color="white">
                Home
            </ChakraLink>
            <ChakraLink as={Link} to="/portfolio" onClick={onToggle} color="white">
                Portfolio
            </ChakraLink>
            <ChakraLink as={Link} to="/about" onClick={onToggle} color="white">
                About
            </ChakraLink>
            <ChakraLink as={Link} to="/contact" onClick={onToggle} color="white">
                Contact
            </ChakraLink>
        </Flex>
    </Box>
)}
</Box>
);
}
