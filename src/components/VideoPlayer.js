import React, { useRef, useState } from 'react';

const VideoPlayer = ({ 
  src, 
  type = 'video/mp4',
  poster,
  width = '640px',
  height = '360px'
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  // Format time in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleError = (e) => {
    setError('Error loading video. Please check the source and try again.');
  };

  return (
    <div className="flex flex-col w-full max-w-4xl">
      {/* Video Element */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full rounded-lg shadow-lg"
          style={{ maxHeight: height }}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Custom Controls */}
      <div className="mt-4 px-4 py-2 bg-gray-100 rounded-lg">
        {/* Play/Pause Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          {/* Time Display */}
          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;