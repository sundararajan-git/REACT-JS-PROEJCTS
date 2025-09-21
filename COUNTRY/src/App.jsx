const App = () => {
  return (
    <div>
      <CountryExplorer />
    </div>
  );
};
export default App;

("use client");

import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Select,
  SimpleGrid,
  Image,
  Text,
  Spinner,
  VStack,
  Heading,
} from "@chakra-ui/react";

function CountryExplorer() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3,area,languages,currencies,subregion";

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("REST Countries error:", data);
          throw new Error(data.message || `Status ${res.status}`);
        }
        setCountries(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
        setError(err.message || "Failed to load countries");
      });
  }, []);

  useEffect(() => {
    let data = countries;

    if (search) {
      data = data.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      data = data.filter((c) => c.region === region);
    }

    setFiltered(data);
  }, [search, region, countries]);

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading countries...</Text>
      </Box>
    );
  }

  console.log(filtered);

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading mb={6}>🌍 Country Explorer</Heading>

      <Box display="flex" gap={4} mb={6} flexWrap="wrap">
        <Input
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="300px"
        />
        {/* <Select
          placeholder="Filter by Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          maxW="200px"
        >
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Select> */}
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {filtered?.map((country) => (
          <Box
            key={country.cca3}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            bg="white"
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
          >
            <Image
              src={country.flags.png}
              alt={country.name.common}
              w="100%"
              h="150px"
              objectFit="cover"
            />
            <VStack align="start" p={4} spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                {country.name.common}
              </Text>
              <Text>Region: {country.region}</Text>
              <Text>Population: {country.population.toLocaleString()}</Text>
              <Text>Capital: {country.capital?.[0] || "N/A"}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
