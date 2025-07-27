import HeroVideo from './HeroVideo'

const Hero = () => {




  return (
    <section id="home" className="hero-section">
      {/* Background Video - Local Video */}
      <HeroVideo
        videoSrc="assets/vido.mp4"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      />

      {/* Alternative: Simple YouTube with Auto Sound */}
      {/* <SimpleYouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      /> */}

      {/* Alternative: Advanced YouTube Video */}
      {/* <YouTubeVideo
        videoId="IyHhWFIecc8"
        fallbackImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        enableSound={true}
      /> */}

    </section>
  )
}

export default Hero
