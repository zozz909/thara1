import React, { useState, useRef, useEffect } from 'react'

const HeroVideo = ({ videoSrc, fallbackImage, enableSound = false }) => {
  const [hasVideo, setHasVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(!enableSound)
  const videoRef = useRef(null)

  useEffect(() => {
    // Check if video file exists
    const checkVideoExists = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' })
        if (response.ok) {
          setHasVideo(true)
        }
      } catch (error) {
        console.log('Video not found, using fallback image')
        setHasVideo(false)
      }
    }

    if (videoSrc) {
      checkVideoExists()
    }
  }, [videoSrc])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    if (videoRef.current) {
      // Try to play with sound first, fallback to muted if needed
      if (enableSound) {
        videoRef.current.muted = false
        videoRef.current.play().then(() => {
          setIsPlaying(true)
          setIsMuted(false)
        }).catch(error => {
          console.log('Video autoplay with sound failed, trying muted:', error)
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(err => {
            console.log('Video autoplay failed completely:', err)
          })
        })
      } else {
        videoRef.current.play().catch(error => {
          console.log('Video autoplay failed:', error)
        })
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback')
    setHasVideo(false)
  }

  if (!hasVideo) {
    return null // Fallback to CSS background image
  }

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        autoPlay
        muted={!enableSound}
        loop
        playsInline
        className="hero-video-bg"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Video Controls */}
      {videoLoaded && enableSound && (
        <div className="video-controls" style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={togglePlay}
            className="video-control-btn"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
          </button>

          <button
            onClick={toggleMute}
            className="video-control-btn"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          >
            <i className={`bi ${isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
          </button>
        </div>
      )}
      
      {/* Loading placeholder */}
      {!videoLoaded && hasVideo && (
        <div className="video-loading" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, rgba(160, 130, 109, 0.8) 0%, rgba(93, 78, 55, 0.85) 50%, rgba(62, 39, 35, 0.9) 100%), url('${fallbackImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          <div className="loading-spinner">
            <i className="bi bi-play-circle" style={{ fontSize: '3rem', opacity: 0.7 }}></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroVideo
