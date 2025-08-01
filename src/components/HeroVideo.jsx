import React, { useState, useRef, useEffect } from 'react'

const HeroVideo = ({ videoSrc, fallbackImage, enableSound = false }) => {
  const [hasVideo, setHasVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // يبدأ بالصوت مفعل دائماً
  const [showSoundNotice, setShowSoundNotice] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
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

  // إضافة مستمع للنقر لتفعيل الصوت
  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current && isMuted && enableSound) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }

    document.addEventListener('click', handleUserInteraction, { once: true })
    document.addEventListener('touchstart', handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [isMuted, enableSound])

  // محاولة تفعيل الصوت عند تحميل الصفحة
  useEffect(() => {
    if (enableSound && videoRef.current && videoLoaded) {
      const attemptUnmute = () => {
        if (videoRef.current) {
          videoRef.current.muted = false
          setIsMuted(false)
        }
      }

      // محاولة فورية
      attemptUnmute()

      // محاولة بعد ثانية واحدة
      const timer = setTimeout(attemptUnmute, 1000)

      // محاولة بعد 3 ثوانٍ
      const timer2 = setTimeout(attemptUnmute, 3000)

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    }
  }, [enableSound, videoLoaded])

  // تحديد نوع الجهاز
  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(checkMobile)
  }, [])

  // تحسينات خاصة للجوال والتشغيل التلقائي
  useEffect(() => {

    if (videoRef.current) {
      // إعدادات عامة للفيديو
      videoRef.current.setAttribute('playsinline', 'true')
      videoRef.current.setAttribute('webkit-playsinline', 'true')
      videoRef.current.setAttribute('autoplay', 'true')
      videoRef.current.muted = true

      // محاولة تشغيل الفيديو فوراً
      const attemptPlay = () => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            console.log('Video autoplay successful')
            setIsPlaying(true)

            // محاولة تفعيل الصوت تدريجياً
            if (enableSound) {
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.muted = false
                  setIsMuted(false)
                }
              }, 1000)
            }
          }).catch(error => {
            console.log('Video autoplay failed, will try on user interaction:', error)
          })
        }
      }

      // محاولة فورية
      attemptPlay()

      // محاولة عند التفاعل
      const playVideoOnInteraction = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(console.log)
          if (enableSound) {
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.muted = false
                setIsMuted(false)
                setShowSoundNotice(false)
              }
            }, 500)
          }
        }
      }

      // إضافة مستمعين للأحداث
      document.addEventListener('touchstart', playVideoOnInteraction, { once: true })
      document.addEventListener('click', playVideoOnInteraction, { once: true })
      document.addEventListener('keydown', playVideoOnInteraction, { once: true })

      return () => {
        document.removeEventListener('touchstart', playVideoOnInteraction)
        document.removeEventListener('click', playVideoOnInteraction)
        document.removeEventListener('keydown', playVideoOnInteraction)
      }
    }
  }, [enableSound, isMobile])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    if (videoRef.current) {
      // محاولة تشغيل الفيديو تلقائياً بدون صوت أولاً
      videoRef.current.muted = true
      setIsMuted(true)

      videoRef.current.play().then(() => {
        setIsPlaying(true)
        console.log('Video started successfully')

        // محاولة تفعيل الصوت تدريجياً
        if (enableSound) {
          // محاولة فورية
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = false
              setIsMuted(false)
            }
          }, 100)

          // محاولة ثانية بعد ثانية
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = false
              setIsMuted(false)
            }
          }, 1000)

          // محاولة ثالثة بعد 3 ثوانٍ
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = false
              setIsMuted(false)
            }
          }, 3000)
        }
      }).catch(error => {
        console.log('Video autoplay failed:', error)
        // محاولة أخيرة مع إعدادات مختلفة
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.autoplay = true
          videoRef.current.load()
        }
      })
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
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        className="hero-video-bg"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={() => {
          // محاولة تشغيل الفيديو عند جاهزيته للتشغيل
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(console.log)
          }
        }}
        onLoadedMetadata={() => {
          // محاولة إضافية عند تحميل البيانات الوصفية
          if (videoRef.current) {
            videoRef.current.play().catch(console.log)
          }
        }}
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

      {/* إشعار خاص بالجوال */}
      {isMobile && showSoundNotice && (
        <div
          className="mobile-video-notice"
          onClick={() => setShowSoundNotice(false)}
        >
          📱 اضغط في أي مكان لتشغيل الفيديو والصوت
        </div>
      )}
    </div>
  )
}

export default HeroVideo
