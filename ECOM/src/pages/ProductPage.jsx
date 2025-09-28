import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RatingBreakdown from "../components/RatingBreakdown";
import ProductReviews from "../components/ProductReviews";
import ProductDetails from "../components/ProductDetails";
import { useParams, useLocation } from "react-router-dom";
import { EcomContext } from "../layout/AuthLayout";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(EcomContext);
  const [product, setProduct] = useState();
  const { pathname } = useLocation();
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const pro = products.find((p) => p.id === parseInt(id)) ?? {};
    setProduct(pro);
    console.log(products);
  }, [products, id]);

  const handleAddToCart = () => {
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

  const qtyChangeHandler = (type) => {
    setProducts((prev) => {
      const clone = prev.map((p) => {
        if (p.id === parseInt(id)) {
          if (type === "INC") {
            return { ...p, quantity: Math.max(p.quantity + 1, 1) };
          } else if (type === "DEC") {
            return { ...p, quantity: Math.max(p.quantity - 1, 1) };
          }
        } else {
          return p;
        }
      });
      return clone;
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center itmes-start gap-4">
          {/* <div className="flex flex-col items-start gap-6">
            {[product.images, product.images].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} image ${index + 1}`}
                className="w-20 object-cover rounded-sm"
              />
            ))}
          </div> */}
          {product?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product?.name} image ${index + 1}`}
              className="w-90 h-auto object-cover rounded-lg"
            />
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-400 mt-2">
            ${parseFloat(product?.price).toFixed(2)}
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className={
                  index + 1 < product?.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-500">
              ({product?.reviews} reviews)
            </span>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-500">
            {product?.description}
          </p>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-500">
              Size
            </label>
            <div className="flex items-center flex-wrap gap-4">
              {product?.sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border-none rounded-sm py-2 text-xs font-medium transition-colors cursor-pointer hover:bg-blue-600 hover:text-white dark:hover:text-white
                  ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : " bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white"
                  }`}
                  size="icon"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col  gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-500">
              Quantity
            </label>
            <div className="flex items-center">
              <Button
                onClick={() => qtyChangeHandler("DEC")}
                className="size-8 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer"
                variant="outline"
                disabled={product?.quantity === 1}
              >
                <FiMinus />
              </Button>
              <span className="px-4 py-1 text-center w-12">
                {product?.quantity}
              </span>
              <Button
                onClick={() => qtyChangeHandler("INC")}
                className="size-8 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
                variant="outline"
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              onClick={handleAddToCart}
              className="w-fit flex items-center justify-center gap-2 rounded-sm cursor-pointer"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
            <Button
              onClick={handleAddToCart}
              className="w-fit flex items-center justify-center gap-2 rounded-sm bg-green-700 text-white cursor-pointer hover:bg-green-800"
            >
              <RiMoneyDollarCircleLine size={20} />
              Buy Now
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-transparent gap-4">
              <TabsTrigger
                value="details"
                className="dark:data-[state=active]:border-x-0 dark:data-[state=active]:border-t-0 dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-primary cursor-pointer rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none data-[state=active] bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="dark:data-[state=active]:border-x-0 dark:data-[state=active]:border-t-0 dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-primary cursor-pointer rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none data-[state=active] bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProductDetails />
            </TabsContent>
            <TabsContent value="reviews">
              <ProductReviews />
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:mt-15">
          <RatingBreakdown rating={product?.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
