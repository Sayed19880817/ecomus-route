import { Star, StarHalf } from "lucide-react";

export const renderStars = (rating: number, size: number = 14) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star size={size} key={i} className="fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <StarHalf key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    } else {
      stars.push(<Star key={i} className="w-3 h-3 text-transparent" />);
    }
  }

  return stars;
};
