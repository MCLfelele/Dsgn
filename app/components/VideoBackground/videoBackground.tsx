import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video element */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Welcome to My Website</h1>
      </div>
    </div>
  );
};

export default VideoBackground;