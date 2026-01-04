import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="mt-4 text-lg font-medium text-foreground">
        Searching for similar products...
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        Our AI is analyzing your image
      </p>
    </div>
  );
};
