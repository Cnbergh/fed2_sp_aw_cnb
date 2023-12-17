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
    <article className='pb-20 mx-auto'>
      <h4 className="text-2xl my-10 font-semibold text-accent/80">List of BiddingsRooms</h4>

      {error && <Error errorKey="products_ui_error" message={error} />}

      <div className="flex flex-row flex-wrap items-center space-y-2 gap-x-4 h-full px-2 border-y-2 border-stone-700/30 my-10 mx-auto">
        {isLoading ? <Skeleton /> : products.map((product, index) => (
    <ProductItem key={`${product.id}-${index}`} product={product} />
  ))}
      </div>

      {!isLoading && products.length > 0 && loadMoreProducts && (
        <button 
          onClick={loadMoreProducts}
          className="btn mx-auto border-2 rounded-xl border-white/50 w-full max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent hover:before:content-['↶'] hover:after:content-['↷']">
          Load More
        </button>
      )}
    </article>
  );
}