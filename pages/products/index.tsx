import { Suspense } from "react";


export type Props = {
	searchParams: Record<string, string> | null | undefined;
};


export default async function HomePage(props: Props) {
	const { searchParams } = props;
	const showModal = searchParams?.modal === "true";
	const productId = searchParams?.id;

	const response = await fetch(PRODUCT_API, { next: { revalidate: 60 * 60 } });
	const products = await response.json();

	return (
		<>
			<ProductLayout>
				{products.map((product: Product, idx: number) => {
					return <ProductCard key={idx} {...product} />;
				})}
			</ProductLayout>

			{showModal && (
				<Suspense key={productId} fallback={<ProductLoading />}>
					<ProductModal id={productId} />
				</Suspense>
			)}
		</>
	);
}
