const App = () => {
  return (
    <>
      <URLShortener />
    </>
  );
};
export default App;

("use client");

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Heading,
} from "@chakra-ui/react";

function URLShortener() {
  const [urlInput, setUrlInput] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  // const toast = useToast();

  // Function to generate random 6-character short code
  const generateShortCode = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleShorten = () => {
    if (!urlInput.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const shortCode = generateShortCode();
    const shortUrl = `https://short.ly/${shortCode}`;

    setShortenedUrls((prev) => [
      ...prev,
      { original: urlInput, short: shortUrl },
    ]);

    toast({
      title: "URL Shortened!",
      description: shortUrl,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setUrlInput("");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: text,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      p={6}
      maxW="md"
      mx="auto"
      mt={10}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
    >
      <Heading mb={4} size="md" textAlign="center">
        Frontend URL Shortener
      </Heading>

      <HStack mb={4}>
        <Input
          placeholder="Enter URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleShorten}>
          Shorten
        </Button>
      </HStack>

      <VStack spacing={3} align="stretch">
        {shortenedUrls.map((item, index) => (
          <HStack
            key={index}
            justifyContent="space-between"
            p={2}
            borderWidth={1}
            borderRadius="md"
          >
            <Box>
              <Text fontSize="sm" noOfLines={1}>
                {item.original}
              </Text>
              <Text fontSize="sm" color="blue.500" fontWeight="bold">
                {item.short}
              </Text>
            </Box>
            <Button size="sm" onClick={() => handleCopy(item.short)}>
              Copy
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
