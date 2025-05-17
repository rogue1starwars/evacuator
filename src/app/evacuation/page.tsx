"use client";

import { useEffect, useRef, useState } from "react";
import { captureAndUpload } from "@/utils/captureAndUpload";
import Record from "@/components/Record";

export default function Evacuation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interval = 5000;

  // State for captured images and locations
  const [image, setImage] = useState<Blob | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    let intervalId: NodeJS.Timeout;
    let gpsIntervalId: NodeJS.Timeout;

    // Start webcam
    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      stream = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      // Capture image every interval
      intervalId = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          // Draw video frame to canvas
          const video = videoRef.current;
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) setImage(blob);
            }, "image/jpeg");
          }
        }
      }, interval);

      // Capture location every interval
      gpsIntervalId = setInterval(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: position.timestamp,
            });
          });
        }
      }, interval);
    });

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (intervalId) clearInterval(intervalId);
      if (gpsIntervalId) clearInterval(gpsIntervalId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <video ref={videoRef} className="hidden mb-4" />
      <canvas ref={canvasRef} className="hidden" />
      <Record image={image} location={location} />
    </div>
  );
}
