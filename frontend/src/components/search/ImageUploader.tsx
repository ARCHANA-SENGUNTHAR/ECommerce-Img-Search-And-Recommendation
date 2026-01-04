import { useCallback, useState, useEffect,  useRef } from "react";
import { Upload, Image as ImageIcon, Camera, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImagesSelect: (imageUrls: string[]) => void; // return array of URLs
}

export const ImageUploader = ({ onImagesSelect }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("top_k", "20");

    try {
      console.log("Sending request to backend...");
      const res = await fetch("http://localhost:8000/search/", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (data.top_k_results && data.top_k_results.length > 0) {
        // map backend paths to full URLs
        const urls = data.top_k_results.map((path: string) =>
          path.startsWith("http") ? path : `http://localhost:8000${path}`
        );
        console.log("Final URLs:", urls);
        onImagesSelect(urls);
      } else {
        console.log("No top_k_results in response");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  }, [onImagesSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            await handleFile(file);
          }
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  // Camera functionality
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setCameraStream(stream);
      setShowCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
    setUploadedImagePreview(null);
  }, [cameraStream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            await handleFile(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  }, [handleFile, stopCamera]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Take Photo</h3>
              <Button variant="ghost" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-lg object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-3">
              <Button onClick={captureImage} className="flex-1">
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </Button>
              <Button variant="outline" onClick={stopCamera} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Search Bar Style Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative flex items-center w-full h-16 rounded-xl border-2 border-dashed cursor-pointer transition-smooth bg-white",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-slate-300 hover:border-primary/50 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="p-2 rounded-lg bg-slate-100">
                <ImageIcon className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">
                  {isDragging ? "Drop your image here" : "Click to upload or paste image (Ctrl+V)"}
                </p>
                <p className="text-xs text-slate-500">
                  JPG, PNG, WebP supported
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
                className="flex items-center gap-1"
              >
                <Upload className="w-4 h-4" />
                Browse
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
                className="flex items-center gap-1"
              >
                <Camera className="w-4 h-4" />
                Camera
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="sr-only"
          />
        </div>

        {/* Alternative Upload Options */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handleBrowseClick}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Browse Files
          </Button>

          <Button
            variant="outline"
            onClick={startCamera}
            className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Use Camera
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 px-3 py-2 rounded-lg">
            <Copy className="w-4 h-4" />
            <span>Or paste with Ctrl+V</span>
          </div>
        </div>
      </div>
    </>
  );
};
