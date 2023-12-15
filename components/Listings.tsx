import { useEffect, useState } from "react";
import ProductsUI from "./Ui/ProductsUi";
import { Product } from "../pages/api/type";
import { fetchApiListings } from "../pages/api/api";

export default function Listings() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedProducts, setLoadedProducts] = useState<number>(9);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchApiListings(data.length, loadedProducts);
        if (Array.isArray(response)) {
          setData(prevData => [...prevData, ...response]);
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, [loadedProducts]);

  const loadMoreProducts = () => {
    setLoadedProducts(prev => prev + 9);
  };

  return (
    <ProductsUI
      products={data}
      isLoading={isLoading}
      error={error}
      loadMoreProducts={loadMoreProducts}
    />
  );
}
