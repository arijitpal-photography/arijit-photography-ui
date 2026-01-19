import { Box } from "@chakra-ui/react";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

export default function PageLayout({ children }) {
    return (
        <Box display="flex" flexDirection="column" minH="100vh">
            <Header />
            <Box as="main" flex="1" width="100%" display="flex" flexDirection="column" justifyContent="space-between">
                {children}
            </Box>
            <Footer />
        </Box>
    );
}
