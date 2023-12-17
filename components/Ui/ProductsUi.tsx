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
          className="btn border-2 rounded-full border-white/50 w-full max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent">
          Load More
        </button>
      )}
    </article>
  );
}