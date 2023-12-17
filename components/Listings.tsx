import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProductsUI from "./Ui/ProductsUi";
import Skeleton from "./Ui/Skeleton";
import { fetchApiListings } from "../pages/api/api";
import { Product } from "../pages/api/type";

export default function Listings() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedProducts, setLoadedProducts] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchData();
  }, [loadedProducts, isActive, sortBy, searchTerm, tag]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApiListings(0, loadedProducts, searchTerm, isActive, tag, sortBy);
      if (Array.isArray(response)) {
        setData(response); 
      } else {
        console.error("Response is not an array:", response);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    fetchData();
  };

  const loadMoreProducts = () => setLoadedProducts(prev => prev + 12);

  if (isLoading && data.length === 0) return <Skeleton />;
  if (error) return <span>Error: {error}</span>;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ProductsUI products={data} isLoading={isLoading} error={error} loadMoreProducts={loadMoreProducts} />
    </>
  );
}
