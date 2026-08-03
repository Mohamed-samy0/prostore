import ProductForm from "@/components/shared/admin/product-form";
import { getProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update product",
};

const UpdateProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const product = await getProductById(id);
  if (!product) return notFound();
  return (
    <div className="space-y-8 mx-auto max-w-5xl">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm type="Update" product={product} productId={id} />
    </div>
  );
};

export default UpdateProductPage;
