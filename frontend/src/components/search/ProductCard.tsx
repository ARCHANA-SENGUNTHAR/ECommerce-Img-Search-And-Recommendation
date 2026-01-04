import { Product } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden bg-card border border-border card-hover cursor-pointer",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover image-zoom"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <span className="mt-1 text-xs text-muted-foreground">
          {product.category}
        </span>
      </div>
    </div>
  );
};
