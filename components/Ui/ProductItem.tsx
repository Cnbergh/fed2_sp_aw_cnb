import { Product } from '../../pages/api/type';
// next image
import Image from "next/image";
// next link
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

//Listing (card)
export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="relative group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
  );
}