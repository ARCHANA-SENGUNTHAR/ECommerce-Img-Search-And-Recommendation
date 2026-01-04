import { Product } from "@/lib/mockData";
import { ProductCard } from "./ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SimilarProductsProps {
  products: Product[];
}

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Similar Images
      </h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-[200px] flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
