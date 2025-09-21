import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    comment: "Amazing hoodie! Fits perfectly and very comfortable.",
    date: "Sep 10, 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    comment: "Good quality, but the color is slightly different than shown.",
    date: "Sep 8, 2025",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/40?img=3",
    rating: 5,
    comment: "Excellent hoodie! Warm and stylish.",
    date: "Sep 5, 2025",
  },
];

export default function ProductReviews() {
  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-xl font-bold">Customer Reviews</h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex gap-4 p-4 border rounded-md shadow-sm"
        >
          {/* Avatar */}
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Review Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
