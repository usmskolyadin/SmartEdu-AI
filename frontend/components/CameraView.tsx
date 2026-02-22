"use client";

import { useEffect, useRef, useState } from "react";

type Detection = [number, number, number, number, "person" | "phone", number];

export default function CameraView() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const objectsRef = useRef<Detection[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            if (canvasRef.current && videoRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws");

    wsRef.current.onopen = () => addLog("🟢 WebSocket connected");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      objectsRef.current = data.objects || [];

      addLog(`📦 objects: ${objectsRef.current.length}`);
    };

    wsRef.current.onclose = () => addLog("🔴 WebSocket closed");
    wsRef.current.onerror = () => addLog("⚠️ WS error");

    return () => wsRef.current?.close();
  }, []);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 20)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!video || !canvas || !ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      objectsRef.current.forEach(([x, y, w, h, type, conf]) => {
        if (type === "person") ctx.strokeStyle = "#ff4d4f"; // red
        else if (type === "phone") ctx.strokeStyle = "#40a9ff"; // blue

        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(x, y - 18, w, 18);

        ctx.fillStyle = "#fff";
        ctx.font = "12px sans-serif";
        ctx.fillText(`${type} ${(conf * 100).toFixed(0)}%`, x + 4, y - 5);
      });

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const frame = canvas.toDataURL("image/jpeg", 0.7); 
        wsRef.current.send(frame);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const persons = objectsRef.current.filter((o) => o[4] === "person").length;
  const phones = objectsRef.current.filter((o) => o[4] === "phone").length;

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">

      <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col">

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Live Camera</h2>
          <span className="text-xs text-white/40">AI detection active</span>
        </div>

        <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        <div className="flex justify-between mt-3 text-xs text-white/50">
          <span>Status: running</span>
          <span>FPS: ~10</span>
        </div>
      </div>

      <div className="w-[340px] flex flex-col gap-6">

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4">
          <h3 className="text-sm font-semibold mb-3">Detection Stats</h3>

          <div className="flex flex-col gap-2 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Objects</span>
              <span>{objectsRef.current.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Humans</span>
              <span>{persons}</span>
            </div>

            <div className="flex justify-between">
              <span>Phones</span>
              <span>{phones}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-4 flex flex-col">
          <h3 className="text-sm font-semibold mb-2">System Console</h3>

          <div className="flex-1 overflow-y-auto text-xs font-mono text-green-400 space-y-1">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}