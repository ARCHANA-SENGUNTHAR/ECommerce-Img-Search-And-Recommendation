import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedImagePreviewProps {
  imageData: string;
  onClear: () => void;
}

export const UploadedImagePreview = ({ imageData, onClear }: UploadedImagePreviewProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto animate-scale-in">
      <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border">
        <img
          src={imageData}
          alt="Uploaded search image"
          className="w-full h-auto max-h-64 object-contain bg-surface"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />
      </div>
      
      <Button
        size="icon"
        variant="secondary"
        onClick={onClear}
        className="absolute -top-2 -right-2 rounded-full shadow-medium h-8 w-8 hover:bg-destructive hover:text-destructive-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </Button>
      
      <p className="text-center text-sm text-muted-foreground mt-3">
        Your uploaded image
      </p>
    </div>
  );
};
