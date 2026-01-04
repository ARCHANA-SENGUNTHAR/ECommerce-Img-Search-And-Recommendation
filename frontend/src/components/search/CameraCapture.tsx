import { useRef, useState, useCallback } from "react";
import { Camera, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void;
}

export const CameraCapture = ({ onImageCapture }: CameraCaptureProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1280, height: 720 }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setCapturedImage(null);
    setTimeout(startCamera, 100);
  }, [startCamera]);

  const handleClose = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    setIsOpen(false);
  }, [stopCamera]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(imageData);
      stopCamera();
    }
  }, [stopCamera]);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
      handleClose();
    }
  }, [capturedImage, onImageCapture, handleClose]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outline"
        className="h-14 gap-3 px-6 rounded-xl border-border hover:border-primary/50 hover:bg-surface-hover transition-smooth"
      >
        <Camera className="w-5 h-5" />
        <span className="font-medium">Use Camera</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card">
          <DialogTitle className="sr-only">Camera Capture</DialogTitle>
          <div className="relative aspect-[4/3] bg-foreground/5">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="p-4 flex justify-center gap-4">
            {capturedImage ? (
              <>
                <Button
                  variant="outline"
                  onClick={retakePhoto}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Retake
                </Button>
                <Button onClick={confirmCapture} className="gap-2">
                  <Check className="w-4 h-4" />
                  Use Photo
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full p-0"
              >
                <div className="w-12 h-12 rounded-full border-4 border-primary-foreground" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
