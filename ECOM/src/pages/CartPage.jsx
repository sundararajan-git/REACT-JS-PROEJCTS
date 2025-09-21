import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { initialCart } from "../lib/db";

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id, value) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(value) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid gap-4">
        {cart.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col md:flex-row items-center p-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-32 object-cover rounded-md"
            />

            <CardContent className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
            </CardContent>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-16"
              />
            </div>

            <CardFooter className="flex items-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end flex-col md:flex-row gap-4 items-center">
        <div className="text-lg font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
        <Button size="lg">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
