# مؤسسة ثرى للضيافة - React Version

This is the React version of the Thara Hospitality website, converted from the original HTML/CSS/JavaScript implementation.

## Features

- **Modern React Architecture**: Built with React 18 and Vite for optimal performance
- **Responsive Design**: Fully responsive design that works on all devices
- **Arabic RTL Support**: Complete right-to-left language support
- **Interactive Components**: Smooth animations, counters, and image slideshows
- **Performance Optimized**: Lazy loading, mobile optimizations, and efficient rendering
- **Bootstrap Integration**: Uses Bootstrap 5 with RTL support

## Components Structure

- `LoadingScreen`: Animated loading screen with progress indicator
- `Navigation`: Responsive navigation with smooth scrolling and active section highlighting
- `Hero`: Main hero section with parallax effects
- `Story`: Company story section with animations
- `Statistics`: Animated counters showing company achievements
- `Vision`: Company vision section
- `Mission`: Company mission with values
- `Services`: Interactive service cards with image slideshows
- `Footer`: Contact information and social links

## Technologies Used

- React 18
- Vite
- React Router DOM
- Bootstrap 5 (RTL)
- Bootstrap Icons
- Custom CSS with CSS Variables

## Getting Started

### Prerequisites
- Node.js (version 20.15.0 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Adding Hero Video

#### Option 1: YouTube Video (Current Setup)
The site is currently configured to use a YouTube video with automatic sound:

- **Current Video ID**: `IyHhWFIecc8`
- **Features**: Auto-play with sound, loop, responsive design, mute toggle button
- **Sound Control**: Small mute/unmute button in top-right corner
- **Clean Interface**: Minimal text, no extra buttons or overlays

To change the YouTube video:
1. Update the `videoId` prop in `src/components/Hero.jsx`
2. Replace `"IyHhWFIecc8"` with your YouTube video ID

#### Option 2: Local Video File
To use a local video file instead:

1. Uncomment the `HeroVideo` component in `Hero.jsx`
2. Comment out the `YouTubeVideo` component
3. Place your video file in the `public/assets/` directory
4. Name it `hero-video.mp4` (or update the path)
5. Recommended specifications:
   - Format: MP4 (H.264)
   - Resolution: 1920x1080 or higher
   - Duration: 10-30 seconds (looped)
   - File size: Under 10MB for optimal loading

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Key Features Converted from Original

1. **Loading Screen Animation**: Fully functional with progress bar and floating elements
2. **Smooth Scrolling Navigation**: React-based navigation with active section detection
3. **Statistics Counter Animation**: Intersection Observer-based counters
4. **Image Slideshows**: React state-managed slideshows for service cards
5. **Mobile Optimizations**: Custom hook for mobile-specific optimizations
6. **Parallax Effects**: Performance-optimized parallax scrolling
7. **Lazy Loading**: Custom LazyImage component for performance
8. **Hero Background Video**: Auto-playing background video with fallback support
9. **Enhanced Image Quality**: Optimized image rendering with improved clarity and contrast

## Performance Optimizations

- Lazy loading for images
- Mobile-specific optimizations
- Efficient re-rendering with React hooks
- Optimized bundle size with Vite
- CSS variables for consistent theming
- Enhanced image quality with CSS filters
- GPU-accelerated animations
- Optimized video loading with fallback support

## Recent Enhancements

### Hero Video Background
- YouTube video with automatic sound playback
- Clean interface with minimal text (only company name)
- Small mute/unmute toggle button in top-right corner
- Automatic fallback to background image if video is unavailable
- Optimized loading with smooth transitions
- Mobile-friendly video handling
- No intrusive overlays or extra buttons

### Improved Image Quality
- Enhanced image clarity with CSS filters (brightness, contrast, saturation)
- Better image rendering with crisp-edges optimization
- Improved object positioning for better visual appeal
- High DPI display optimization
- Hover effects for interactive elements

## Contact Information

- Phone: 0547443133
- Email: thara-@outlook.ks
- Location: Riyadh, Saudi Arabia

## Social Media

- TikTok: [@tharaa_saudi](https://www.tiktok.com/@tharaa_saudi)
- Instagram: [@tharaa_saudi](https://www.instagram.com/tharaa_saudi)
- LinkedIn: [ضيافة ثرى](https://www.linkedin.com/company/ضيافة-ثرى/)
- WhatsApp: [966547443133](https://wa.me/966547443133)
