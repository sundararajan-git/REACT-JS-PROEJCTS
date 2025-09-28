import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { db } from "../lib/db";
import { useNavigate } from "react-router-dom";
import { EcomContext } from "../layout/AuthLayout";
import { useContext } from "react";
import { toast } from "react-hot-toast";

const ProductsGrid = () => {
  const { products, setProducts } = useContext(EcomContext);
  const navigate = useNavigate();
  const cardClickHandler = (id) => {
    navigate(`/product/${id}`);
  };

  const favoriteHandler = (id) => {
    setProducts((prev) => {
      const clone = prev.map((p) => {
        if (p.id === id) {
          return { ...p, isFavorite: !p.isFavorite };
        } else {
          return p;
        }
      });
      return clone;
    });
  };

  const addCartHandler = (id) => {
    setProducts((prev) => {
      const clone = prev.map((p) => {
        if (p.id === id) {
          return { ...p, isCart: true };
        } else {
          return p;
        }
      });
      return clone;
    });
    toast.success("Added Successfully");
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden shadow-none border-none w-full bg-transparent"
        >
          <CardHeader
            className="p-0 hover:cursor-pointer"
            onClick={() => cardClickHandler(product.id)}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-80 w-full object-cover rounded-xl"
            />
          </CardHeader>
          <CardContent
            className="flex items-center justify-between p-0 hover:cursor-pointer"
            onClick={() => cardClickHandler(product.id)}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground">Clothing</p>
            </div>
            <p className="text-xl font-bold">${product.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 w-full px-1">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() => favoriteHandler(product.id)}
            >
              {product.isFavorite ? (
                <FaHeart className="text-red-600" />
              ) : (
                <FiHeart />
              )}
            </Button>
            <Button
              className="rounded-sm font-medium cursor-pointer"
              onClick={() => addCartHandler(product.id)}
            >
              {product.isCart ? (
                "Added"
              ) : (
                <>
                  <LuPlus />
                  Add to Cart
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default ProductsGrid;
