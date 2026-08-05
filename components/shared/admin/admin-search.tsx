"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
      ? "/admin/users"
      : "/admin/products";

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        defaultValue={query}
        key={query}
        className="md:w-25 lg:w-[300px]"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
