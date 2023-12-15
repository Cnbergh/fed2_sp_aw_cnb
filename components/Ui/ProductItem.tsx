import { useState } from "react";
import { Product } from "../../pages/api/type";

// next link
import Link from "next/link";

const FALLBACK_IMAGE = "/fallback-image.jpg";
interface ProductItemProps {
  product: Product;
}

//Listing (card)
export default function ProductItem({ product }: ProductItemProps) {
  const [imgSrc, setImgSrc] = useState(product.media[0] || FALLBACK_IMAGE);

  const handleImgError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };
  return (
    <Link href={`/listings/${product.id}`} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="h-[70%] w-full overflow-hidden">
          <img
            src={imgSrc}
            alt={product.title || "Listing Image"}
            onError={handleImgError}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col">
          <h4 className="text-2xl truncate">{product.title}</h4>
          <div className="flex gap-4 text-sm mt-2">
            <div>
              <p className="text-[#898888]">Current bid</p>
              <p className="font-bold text-[#242424]">No bids</p> {/* Replace with actual bid */}
            </div>
            <div>
              <p className="text-[#898888]">Time left</p>
              <p className="font-bold text-[#242424]">Time</p> {/* Replace with actual time left */}
            </div>
          </div>
        </div>
    </Link>
  );
}
