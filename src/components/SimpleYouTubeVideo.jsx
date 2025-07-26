import React, { useState, useEffect } from 'react'

const SimpleYouTubeVideo = ({ videoId, fallbackImage }) => {
  const [isMuted, setIsMuted] = useState(false) // يبدأ بالصوت مفعل
  const [showMuteButton, setShowMuteButton] = useState(true)
  const [showSoundNotice, setShowSoundNotice] = useState(true)

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    if (!url) return videoId
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : videoId
  }

  const finalVideoId = extractVideoId(videoId)

  useEffect(() => {
    // Show mute button after a delay
    const timer = setTimeout(() => {
      setShowMuteButton(true)
    }, 2000)

    // محاولة تشغيل الصوت تلقائياً عند التحميل
    const attemptAutoplay = () => {
      const iframe = document.getElementById('youtube-player')
      if (iframe) {
        // إرسال رسالة للفيديو لإلغاء كتم الصوت
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*')
      }
    }

    // تأخير قصير للسماح للفيديو بالتحميل
    const autoplayTimer = setTimeout(attemptAutoplay, 3000)

    // إضافة مستمع للنقر لتشغيل الصوت
    const handleUserInteraction = () => {
      if (!isMuted) {
        const iframe = document.getElementById('youtube-player')
        if (iframe) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*')
        }
      }
      setShowSoundNotice(false)
    }

    document.addEventListener('click', handleUserInteraction, { once: true })

    return () => {
      clearTimeout(timer)
      clearTimeout(autoplayTimer)
      document.removeEventListener('click', handleUserInteraction)
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Reload iframe with new mute setting
    const iframe = document.getElementById('youtube-player')
    if (iframe) {
      const currentSrc = iframe.src
      const newSrc = currentSrc.replace(/mute=[01]/, `mute=${!isMuted ? 1 : 0}`)
      iframe.src = newSrc
    }
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
      <iframe
        id="youtube-player"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${finalVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&cc_lang_pref=ar&hl=ar&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          border: 'none'
        }}
      />

      {/* Simple mute/unmute button */}
      {showMuteButton && (
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
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
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
      )}

      {/* إشعار الصوت */}
      {showSoundNotice && !isMuted && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            animation: 'fadeInOut 4s ease-in-out forwards'
          }}
          onClick={() => setShowSoundNotice(false)}
        >
          🔊 انقر على أي مكان لتشغيل الصوت
        </div>
      )}
    </div>
  )
}

export default SimpleYouTubeVideo
