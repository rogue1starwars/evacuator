export const captureAndUpload = async ({
  videoRef,
  canvasRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  if (!videoRef.current || !canvasRef.current) return;
  const video = videoRef.current;
  const canvas = canvasRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg")
  );
  if (blob) {
    const formData = new FormData();
    formData.append("file", blob, "webcam.jpg");
    // Replace '/api/upload' with your actual upload endpoint
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }
};
