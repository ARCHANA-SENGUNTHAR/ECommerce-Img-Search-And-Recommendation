import { useState } from "react";
import { ImageUploader } from "@/components/search/ImageUploader";
import { UploadedImagePreview } from "@/components/search/UploadedImagePreview";
import { SearchHeader } from "@/components/search/SearchHeader";

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-surface">
      <SearchHeader />

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Image uploader */}
        <ImageUploader onImagesSelect={(urls) => setUploadedImages(urls)} />

        {/* Render all uploaded / top-k images */}
        {uploadedImages.map((url, idx) => (
          <UploadedImagePreview
            key={idx}
            imageData={url}
            onClear={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
          />
        ))}
      </main>
    </div>
  );
}
