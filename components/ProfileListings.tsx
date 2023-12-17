import React, { useState, useEffect } from "react";
import { fetchUserListings } from "../pages/api/api";
import ProductsUI from "./Ui/ProductsUi";
import { Product } from "../pages/api/type";

const ProfileListings = () => {
    const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedProducts, setLoadedProducts] = useState<number>(9);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const response = await fetchUserListings(data.length, loadedProducts);
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
    loadListings();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const loadMoreProducts = () => {
    setLoadedProducts(prev => prev + 9);
  };

  return (
    <section className="container mx-auto w-full">
    <div className="w-full h-full mx-auto">
      <h2 className="h3 text-accent/70">Your Listings:</h2>
      <div className="flex flex-col items-center gap-x-8 h-full px-16">
        <ProductsUI
          products={data}
          isLoading={isLoading}
          error={error}
          loadMoreProducts={loadMoreProducts}
        />
      </div>
    </div>
    </section>
  );
};

export default ProfileListings;