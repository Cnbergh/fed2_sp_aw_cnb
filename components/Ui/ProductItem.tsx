import React, { useState } from 'react';
import { Product } from '../../pages/api/type';

// next image
import Image from "next/image";

// next link
import Link from "next/link";

const FALLBACK_IMAGE = "/fallback-image.jpg";
interface ProductItemProps {
  product: Product;
}

//Listing (card)
export default function ProductItem({ product }: ProductItemProps) {
  const [imgSrc, setImgSrc] = useState(product.media[0]);

  const handleImgError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };
  return (
    <div className="relative rounded-lg overflow-hidden flex items-center justify-center group">
      <div className='flex items-center justify-center relative overflow-hidden group'>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-80 group-hover:opacity-100 transition-all duration-700">
        <img
         src={imgSrc}
         width={300} height={200}
         alt={product.title || "Listing Image"}
         onError={handleImgError}/>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/listings/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.description}</p>
      </div>
      </div>
    </div>
  );
}