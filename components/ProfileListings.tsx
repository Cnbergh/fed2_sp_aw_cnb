import React, { useState, useEffect } from "react";
import { fetchUserListings } from "../pages/api/api";
import ProductsUI from "./Ui/ProductsUi";
import { Product } from "../pages/api/type";

const ProfileListings = () => {
  const [products, setListings] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await fetchUserListings();
        setListings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Define loadMoreProducts if necessary, or remove it if not used.

  return (
    <div>
      <h2>Your Listings</h2>
      <div className="flex flex-col items-center gap-x-8 h-full px-16">
        <ProductsUI
          products={products}
          isLoading={isLoading}
          error={error}
          // loadMoreProducts={loadMoreProducts} // Include this if you have implemented pagination
        />
      </div>
    </div>
  );
};

export default ProfileListings;