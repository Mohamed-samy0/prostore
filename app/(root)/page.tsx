import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata = {
  title: "Home",
};
const HomePage = async () => {
  const latestProduct = await getLatestProducts();
  return (
    <>
      <ProductList title="Newest Arrivals" data={latestProduct} limit={4} />
    </>
  );
};

export default HomePage;
