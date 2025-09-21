import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingBreakdown from "../components/RatingBreakdown";
import ProductReviews from "../components/ProductReviews";
import ProductDetails from "../components/ProductDetails";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const product = {
    id: 1,
    name: "Classic Pullover Hoodie",
    price: 39.99,
    images: [
      "https://i.pinimg.com/474x/a7/44/1c/a7441c781a4bc9c2ecaee6b854af1e70.jpg",
      "https://i.pinimg.com/474x/a7/44/1c/a7441c781a4bc9c2ecaee6b854af1e70.jpg",
      "https://i.pinimg.com/474x/a7/44/1c/a7441c781a4bc9c2ecaee6b854af1e70.jpg",
    ],
    description: "A timeless pullover hoodie made from soft cotton blend.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 120,
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} image ${index + 1}`}
              className="w-30 h-auto object-cover rounded-lg"
            />
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className={
                  index < product.rating ? "text-yellow-500" : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="grid grid-cols-12">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-2 text-sm font-medium transition-colors
          ${
            selectedSize === size
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-indigo-500"
          }`}
                  size="icon"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center">
              <Button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="w-1.5 bg-gray-100 hover:bg-gray-200 rounded-full"
                variant="outline"
              >
                -
              </Button>

              <span className="px-4 py-1 text-center w-12">{quantity}</span>

              <Button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                variant="outline"
              >
                +
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="details" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProductDetails />
            </TabsContent>
            <TabsContent value="reviews">
              <ProductReviews />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <RatingBreakdown />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
