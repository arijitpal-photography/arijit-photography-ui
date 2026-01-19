// pages/Footer.jsx
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer"
             bg="blackAlpha.900"
             color="white"
             textAlign="center"
             py="2"
             fontFamily="'Cinzel', serif"
             fontWeight="400"
             textTransform="uppercase"
             letterSpacing="widest">
            <Text fontSize="sm">
                &copy; {new Date().getFullYear()} Arijit Photography
            </Text>
        </Box>
    );
}
