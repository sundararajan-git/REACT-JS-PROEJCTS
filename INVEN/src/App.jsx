"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    if (!form.name || !form.category || !form.quantity || !form.price) {
      toast({
        title: "All fields required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newItem = { id: Date.now(), ...form };
    setItems([...items, newItem]);
    setForm({ name: "", category: "", quantity: "", price: "" });

    toast({
      title: "Item added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Item deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={6} maxW="6xl" mx="auto">
      <Heading mb={6} textAlign="center">
        Inventory Management System
      </Heading>

      <VStack>
        <HStack>
          <Input
            placeholder="Item Name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
          {/* <Select
            placeholder="Category"
            name="category"
            value={form.category}
            onChange={handleInputChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Stationery">Stationery</option>
          </Select> */}
          <Input
            placeholder="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleInputChange}
          />
          <Button colorScheme="blue" onClick={handleAddItem}>
            Add Item
          </Button>
        </HStack>
        {/* 
        <Input
          placeholder="Search by item name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
      </VStack>

      <Box overflowX="auto">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>
                  <IconButton
                    // icon={<EditIcon />}
                    aria-label="Edit"
                    size="sm"
                    mr={2}
                    isDisabled
                  />
                  <IconButton
                    // icon={<DeleteIcon />}
                    aria-label="Delete"
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default App;
