import { Search } from "lucide-react";

export const SearchHeader = () => {
  return (
    <header className="w-full py-4 px-6 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            VisualSearch
          </span>
        </div>
      </div>
    </header>
  );
};
