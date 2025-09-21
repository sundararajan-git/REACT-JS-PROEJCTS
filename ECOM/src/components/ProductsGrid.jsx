import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { products } from "../lib/db";

const ProductsGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-8 lg:grid-cols-4 p-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden shadow-none border-none w-full bg-transparent"
        >
          <CardHeader className="p-0">
            <img
              src={product.image}
              alt={product.name}
              className="h-80 w-full object-cover rounded-xl"
            />
          </CardHeader>
          <CardContent className="flex items-center justify-between p-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground">Clothing</p>
            </div>
            <p className="text-xl font-bold">{product.price}</p>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 w-full px-1">
            <Button variant="outline" size="icon" className="">
              <FiHeart />
            </Button>
            <Button className="rounded-sm font-medium">
              <LuPlus />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default ProductsGrid;
