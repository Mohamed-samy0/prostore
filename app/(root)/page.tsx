import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import { getFeaturedProducts, getLatestProducts } from "@/lib/actions/product.actions";

export const metadata = {
  title: "Home",
};
const HomePage = async () => {
  const latestProduct = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList title="Newest Arrivals" data={latestProduct} limit={4} />
      <ViewAllProductsButton />
      <IconBoxes />
    </>
  );
};

export default HomePage;
