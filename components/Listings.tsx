import { useEffect, useState } from "react";
import ProductsUI from "./Ui/ProductsUi";
import { Product } from "../pages/api/type";
import { fetchApiListings } from "../pages/api/api";

export default function Listings() {
    const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApiListings();
        setData(response as Product[]);
      } catch (error) {
        setError(error as Error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsUI
      error={error}
      isLoading={isLoading}
      products={data || []}
    />
  );
}