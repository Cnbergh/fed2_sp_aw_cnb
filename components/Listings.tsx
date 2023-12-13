import { useEffect, useState } from "react";
import ProductsUI from "./Ui/ProductsUi";
import { ListingsResponse } from "../pages/api/type";
import fetchApiListings from "../pages/api/api";

export default function Listings() {
  const [data, setData] = useState<ListingsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApiListings();
        setData(response);
      } catch (error) {
        setError(error as Error);
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
      products={data?.products || []}
    />
  );
}