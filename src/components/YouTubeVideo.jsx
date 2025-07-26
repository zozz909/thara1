import React, { useState, useRef, useEffect } from 'react'

const YouTubeVideo = ({ videoId, fallbackImage, enableSound = true }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [player, setPlayer] = useState(null)
  const iframeRef = useRef(null)

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) return videoId

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : videoId
  }

  const finalVideoId = extractVideoId(videoId)

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    } else {
      initializePlayer()
    }
  }, [])

  const initializePlayer = () => {
    if (window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player(iframeRef.current, {
        videoId: finalVideoId,
        playerVars: {
          autoplay: 1,
          mute: 0, // Start with sound
          loop: 1,
          playlist: finalVideoId,
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            // Try to play with sound first
            event.target.unMute()
            event.target.playVideo()
            setPlayer(event.target)
            setIsMuted(false)

            // If autoplay with sound fails, the browser will mute it
            setTimeout(() => {
              if (event.target.isMuted()) {
                setIsMuted(true)
              }
            }, 1000)
          },
          onStateChange: (event) => {
            // Check if video is muted by browser policy
            if (event.target.isMuted() && !isMuted) {
              setIsMuted(true)
            }
          },
          onError: () => {
            console.log('YouTube video failed to load')
          }
        }
      })
    }
  }

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
        setIsMuted(false)
      } else {
        player.mute()
        setIsMuted(true)
      }
    }
  }

  const handleMouseEnter = () => {
    setShowControls(true)
  }

  const handleMouseLeave = () => {
    setShowControls(false)
  }

  if (!finalVideoId) {
    return (
      <div className="youtube-video-fallback" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, rgba(160, 130, 109, 0.8) 0%, rgba(93, 78, 55, 0.85) 50%, rgba(62, 39, 35, 0.9) 100%), url('${fallbackImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
    )
  }

  return (
    <div
      className="youtube-video-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    >
      <div
        ref={iframeRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Simple mute/unmute button */}
      <button
        onClick={toggleMute}
        className="video-mute-toggle"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.8)'
          e.target.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.6)'
          e.target.style.transform = 'scale(1)'
        }}
      >
        <i className={`bi ${isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
      </button>
    </div>
  )
}

export default YouTubeVideo
