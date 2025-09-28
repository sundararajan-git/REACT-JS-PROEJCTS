import React from "react";

const productDetails = {
  description:
    "A classic pullover hoodie made from soft cotton blend. Perfect for casual wear, workouts, or lounging at home.",
  specifications: {
    Material: "80% Cotton, 20% Polyester",
    Sizes: "S, M, L, XL",
    Colors: "Black, Grey, Navy",
    Weight: "450g",
    Brand: "Brand A",
  },
  shipping: "Ships within 2-3 business days. Free returns within 30 days.",
  care: "Machine wash cold, tumble dry low, do not bleach.",
};

export default function ProductDetailsColumns() {
  return (
    <div className="flex flex-col gap-6 mt-4 w-full">
      <div className="border rounded-md p-4 shadow-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{productDetails.description}</p>
      </div>

      <div className="border rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Specifications</h3>
        <div className="flex flex-col gap-2 text-gray-700">
          {Object.entries(productDetails.specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b py-1 last:border-none"
            >
              <span className="font-medium">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping</h3>
          <p className="text-gray-700">{productDetails.shipping}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
          <p className="text-gray-700">{productDetails.care}</p>
        </div>
      </div>
    </div>
  );
}
