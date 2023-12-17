import { useState } from "react";
import { Product } from "../../pages/api/type";

// next link
import Link from "next/link";

const FALLBACK_IMAGE = "/fallback-image.jpg";
interface ProductItemProps {
  product: Product;
}

//Listing (card)
function ProductItem({ product }: ProductItemProps) {
  const [imgSrc, setImgSrc] = useState(product.media[0] || FALLBACK_IMAGE);


  const handleImgError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <div className="max-w-xs h-full rounded-lg overflow-hidden shadow-lg bg-stone-700/30 border-x-2 border-stone-100/50 flex flex-col flex-grow">
      <Link
        href={{
          pathname: `/product/[id]`,
          query: { id: product.id },
        }}
        className="aspect-square max-h-[300px] relative bg-white border border-zinc-300 rounded-t-lg"
        scroll={false}
      >
        <img
          src={imgSrc}
          alt={product.title || "Product Image"}
          onError={handleImgError}
          width={400}
          height={300}
          loading="eager"
          className="object-cover object-center w-full h-full"
        />
      </Link>
      <div className="px-6 py-4 space-y-4 flex-grow relative flex flex-col">
        <div className="font-bold text-zinc-100/80 text-xl border-b-2 border-zinc-200/50">
          <h4>{product.title}</h4>
        </div>
          <div className="text-stone-700 text-base truncate">
            <p className="text-stone-700">{product.description}</p>
          </div>
        <div className="flex gap-2 whitespace-nowrap flex-wrap">
          <span className="inline-block px-3 py-1 text-sm font-semibold border-t-2 border-zinc-300/60  bg-zinc-300/30 text-zinc-900">
            {" "}
            Created: {new Date(product.created).toLocaleDateString()}
          </span>
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-zinc-300/30 border-t-2 border-zinc-300/60 text-zinc-900">
            {" "}
            Ends At: {new Date(product.endsAt).toLocaleDateString()}
          </span>
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-zinc-300/30 border-t-2 border-zinc-300/60 text-zinc-900">
            {" "}
            Bids: {product._count.bids}
          </span>
        </div>
      </div>
      <div className="flex-grow flex items-end">
      <Link
      className="justify-center flex text-center w-full border rounded px-3 py-2 text-zinc-100 hover:bg-zinc-200/50 transition-colors duration-300 hover:text-white border-zinc-300 hover:border-zinc-100"
        href={{
          pathname: `/product/[id]`,
          query: { id: product.id },
        }}
        scroll={false}>
          View More
        </Link>
      </div>
    </div>
  );
}
export default ProductItem;
