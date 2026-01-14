import { useEffect, useRef, useState } from "react";

const AdviceVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [ratio, setRatio] = useState(null);
  const [progress, setProgress] = useState(0);

  if (!src) return null;

  const handleLoadedMetadata = (e) => {
    const video = e.target;
    setRatio(video.videoWidth / video.videoHeight);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const isVertical = ratio && ratio < 0.9;
  const isSquare = ratio && ratio >= 0.9 && ratio <= 1.1;

  return (
    <div className="flex justify-center">
      <div
        className={`
          relative overflow-hidden bg-black md:rounded-3xl rounded-xl max-w-120 max-h-100 shadow-xl
          ${isVertical ? "w-[360px] aspect-[9/16]" : ""}
          ${isSquare ? "w-[420px] aspect-square" : ""}
          ${!isVertical && !isSquare ? "w-full max-w-4xl aspect-video" : ""}
        `}
      >
        {!ratio && (
          <div className="absolute inset-0 bg-black/90 animate-pulse" />
        )}

        <video
          key={src}
          ref={videoRef}
          src={src}
          controls
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={(e) =>
            setProgress(
              (e.target.currentTime / e.target.duration) * 100
            )
          }
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* PROGRESS BAR */}
        {ratio && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdviceVideo;
