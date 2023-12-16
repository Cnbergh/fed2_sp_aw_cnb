import { useState } from "react";
import { Product } from "../../pages/api/type";
import MultiPurposeButton from "./ButtonMultiPurpose";

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

  const handleBid = () => {
    console.log("Bid placed!");
  };

  return (
    <Link
      href={`/listings/${product.id}`}
      className="max-w-sm max-h-[500] rounded overflow-hidden shadow-lg"
    >
      <div className="w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={product.title || "Product Image"}
          onError={handleImgError}
          width={400} height={300}
        />
      </div>
      <div className="flex flex-row px-6 py-4">
        <div className="flex-col">
        <h4 className="font-bold text-xl mb-2">{product.title}</h4>
        <div className="text-gray-700 text-base">
          <p>{product.description}</p>
        </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {" "}
            <p>Created: {new Date(product.created).toLocaleDateString()}</p>
          </span>
          <span className="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {" "}
            <p>Ends At: {new Date(product.endsAt).toLocaleDateString()}</p>
          </span>
          <span className="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {" "}
            <p>Bids: {product._count.bids}</p>
          </span>
        </div>
      </div>
      <MultiPurposeButton isBidButton={true} onBid={handleBid}/>
    </Link>
  );
}
