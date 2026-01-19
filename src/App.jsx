import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Landscape from "./pages/genres/Landscape";
import Cityscape from "./pages/genres/Cityscape";
import Wildlife from "./pages/genres/Wildlife";
import Travel from "./pages/genres/Travel";
import Aerial from "./pages/genres/Aerial";
import Patterns from "./pages/genres/Patterns";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Upload from "./pages/Upload";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/landscape" element={<Landscape />} />
            <Route path="/portfolio/cityscape" element={<Cityscape />} />
            <Route path="/portfolio/Wildlife" element={<Wildlife />} />
            <Route path="/portfolio/travel" element={<Travel />} />
            <Route path="/portfolio/aerials" element={<Aerial />} />
            <Route path="/portfolio/patterns" element={<Patterns />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/photo-upload" element={<Upload />} />
        </Routes>
    );
}
