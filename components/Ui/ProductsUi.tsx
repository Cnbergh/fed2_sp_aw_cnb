
import { Product } from '../../pages/api/type';
import ProductItem from "./ProductItem";
import Skeleton from "./Skeleton";
import Error from "./Error";

interface ProductsUIProps {
    products: Product[];
    isLoading: boolean;
    error: Error | null;
  }

export default function ProductsUI({
  products = [],
  isLoading = true,
  error = null,
}: ProductsUIProps) {
  return (
    <article className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h4 className="text-2xl font-bold tracking-tight text-gray-900">
          List of Products
        </h4>

        {error && <Error>{error?.message}</Error>}

        <div className="grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer">
          {isLoading ? (
            <Skeleton />
          ) : (
            products.map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                />
              ),
            )
          )}
        </div>
      </div>
    </article>
  );
}
