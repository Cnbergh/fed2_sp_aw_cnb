import { GetServerSideProps, NextPage } from "next";
import { Product } from "../api/type";
import { useState } from "react";
import MultiPurposeButton from "../../components/Ui/ButtonMultiPurpose";
import Error from "../../components/Ui/Error";
import BidsComponent from '../../components/AllBids';
import makeBid from "../api/makeBid";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBid = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      const result = await makeBid(product.id, bidAmount);
      console.log("Bid placed!", result);
    } catch (error: any) {
      console.error("Error placing bid:"+ error.message);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <Link href="/products" scroll={false}>
        <div className="fixed inset-0 bg-black opacity-75 cursor-default"></div>
      </Link>
      <div className="relative w-full max-w-3xl bg-white rounded-md shadow-md">
        <div className="flex justify-between items-start p-4">
          <Link href="/products" scroll={false}>
            <div className="absolute top-2.5 right-2.5 h-6 w-6 text-accent rounded justify-center items-center flex pb-0.5 cursor-pointer">
              &times;
              <span className="sr-only">Close Modal</span>
            </div>
          </Link>
        </div>
        <div className="bg-primary/30 rounded-lg max-w-3xl mx-auto p-3 space-y-4 overflow-auto z-20">
          <div className="grid gap-4 md:grid-cols-2 items-start">
            <div className="aspect-square w-full relative bg-white rounded-t-lg">
              <img
                alt={product.title}
                className="object-contain w-full rounded-lg overflow-hidden"
                loading="eager"
                src={product.media[0]}
              />
            </div>
            <div className="space-y-2">
              <h1 className="font-bold text-2xl sm:text-3xl max-w-[90%]">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-500">Created: {new Date(product.created).toLocaleDateString()}</span>
                <span className="text-sm text-zinc-500"> Ends At: {new Date(product.endsAt).toLocaleDateString()}</span>
                <span className="text-sm text-zinc-500">Bids: {product._count.bids}</span>
              </div>
              <p className="text-sm leading-loose">{product.description}</p>
              <BidsComponent productId={product.id.toString()} />
          <div className="flex flex-row pb-3 px-3">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              placeholder="Enter bid amount"
              className="input mb-2"
              disabled={isSubmitting}
            />
            <MultiPurposeButton isBidButton={true} onBid={handleBid} />
          </div>
            </div>
          </div>
          {error && <Error errorKey={error} message={error} />}
        </div>
      </div>
    </div>
  );
};
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const res = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}`);
  const product: Product = await res.json();
  return {
    props: {
      product,
    },
  };
};

export default ProductPage;