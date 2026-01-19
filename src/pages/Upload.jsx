import React, { useState } from "react";
import {
    Flex,
    Box,
    Heading,
    Input,
    Button,
    Textarea,
    FormControl,
    FormLabel,
    Text,
    Stack,
    Checkbox,
    CheckboxGroup
} from "@chakra-ui/react";
import PageLayout from "../layouts/PageLayout";

export default function UploadForm() {
    // States for each metadata field + the file
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState([]); // e.g. ["landscape","travel"]
    const [description, setDescription] = useState("");
    const [exif, setExif] = useState("");
    const [status, setStatus] = useState("");

    // Handle file selection
    function handleFileChange(e) {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    // The main upload function
    async function handleUpload() {
        if (!file) {
            alert("Please choose a file first!");
            return;
        }
        if (!title) {
            alert("Please enter a title!");
            return;
        }

        setStatus("Uploading...");

        try {
            const payload = {
                filename: file.name,
                title,
                genres,       // e.g. ["landscape","cityscape"]
                description,
                exif
            };


            // Replace with your actual API Gateway endpoint
            const res = await fetch("https://ilrkmjtzwc.execute-api.us-east-1.amazonaws.com/prod/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) {
                console.error("Error from upload-lambda", data);
                setStatus("Upload failed: " + data.error);
                return;
            }

            // 2) We got a presignedUrl back
            const presigned_url = data.presigned_url;

            // 3) PUT the file to S3 using the presigned_url
            const s3Res = await fetch(presigned_url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type
                },
                body: file
            });

            if (!s3Res.ok) {
                console.error("Error uploading to S3", s3Res);
                setStatus("Upload failed on S3 PUT");
                return;
            }

            setStatus("Upload successful!");
        } catch (err) {
            console.error(err);
            setStatus("Upload failed: " + err.message);
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
            >
                <Box maxW="600px" mx="auto" mt={8} p={4} bg="gray.50">
                    <Heading fontFamily="'Cinzel', serif" mb={6} size="lg" textAlign="center">
                        Upload a New Photo
                    </Heading>
                    <Stack spacing={4}>

                        {/* File input */}
                        <FormControl>
                            <FormLabel>Photo (JPEG)</FormLabel>
                            <Input
                                px={{ base: 1, md: 1 }}    // Overall horizontal padding
                                py={{ base: 1, md: 1 }}    // Overall vertical padding
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFileChange}
                            />
                        </FormControl>

                        {/* Title */}
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        {/* Genres (Checkboxes) */}
                        <FormControl>
                            <FormLabel>Genres</FormLabel>
                            <CheckboxGroup
                                colorScheme="blue"
                                value={genres}
                                onChange={(val) => setGenres(val)} // val is an array of selected values
                            >
                                <Stack spacing={2} direction="row" flexWrap="wrap">
                                    <Checkbox value="landscape">Landscape</Checkbox>
                                    <Checkbox value="cityscape">Cityscape</Checkbox>
                                    <Checkbox value="travel">Travel</Checkbox>
                                    <Checkbox value="wildlife">Wildlife</Checkbox>
                                    <Checkbox value="aerial">Aerial</Checkbox>
                                    <Checkbox value="patterns">Patterns</Checkbox>
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>

                        {/* Description */}
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Describe your photo"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        {/* EXIF */}
                        <FormControl>
                            <FormLabel>EXIF</FormLabel>
                            <Input
                                placeholder="Camera / Lens / Settings"
                                value={exif}
                                onChange={(e) => setExif(e.target.value)}
                            />
                        </FormControl>

                        <Button colorScheme="blue" onClick={handleUpload}>
                            Upload
                        </Button>
                        <Text>{status}</Text>
                    </Stack>
                </Box>
            </Flex>
        </PageLayout>
    );
}
