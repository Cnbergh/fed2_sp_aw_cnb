import { Product } from '../../pages/api/type';
import ProductItem from "./ProductItem";
import Skeleton from "./Skeleton";
import Error from "./Error";

interface ProductsUIProps {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    loadMoreProducts?: () => void;
  }

  export default function ProductsUI({
    products,
    isLoading,
    error,
    loadMoreProducts
  }: ProductsUIProps) {
    return (
    <article>
      <h4 className="text-2xl font-bold text-gray-900">List of Products</h4>

      {error && <Error errorKey="products_ui_error" message={error} />}

      <div className="flex flex-row flex-wrap items-center gap-x-8 h-full px-16">
        {isLoading ? <Skeleton /> : products.map((product, index) => (
    <ProductItem key={`${product.id}-${index}`} product={product} />
  ))}
      </div>

      {!isLoading && products.length > 0 && loadMoreProducts && (
        <button 
          onClick={loadMoreProducts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Load More
        </button>
      )}
    </article>
  );
}