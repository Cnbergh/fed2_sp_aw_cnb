import { GetServerSideProps, NextPage } from 'next';
import {Product} from "../api/type"


interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {/* Render other product details here */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  const res = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;