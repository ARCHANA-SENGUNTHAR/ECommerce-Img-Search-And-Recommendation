import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/lib/mockData";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpandableRecommendationsProps {
  products: Product[];
}

export const ExpandableRecommendations = ({ products }: ExpandableRecommendationsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-14 justify-between rounded-xl border-border hover:border-primary/50 hover:bg-surface-hover transition-smooth mb-6"
      >
        <span className="font-medium">Show more recommendations</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </Button>

      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 overflow-hidden transition-all duration-500 ease-out",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={cn(
              "transition-all duration-300",
              isExpanded ? "animate-fade-in" : ""
            )}
            style={{ animationDelay: isExpanded ? `${index * 40}ms` : "0ms" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
