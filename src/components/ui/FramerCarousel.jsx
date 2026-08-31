import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FramerCarousel.css';

export default function FramerCarousel({
  items = [],
  renderItem,
  autoPlay = true,
  autoPlayInterval = 3800,
  className = '',
  itemWidth = 370,
  gap = 24,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);

  // Update visible items count on resize
  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const count = Math.max(1, Math.floor((width + gap) / (itemWidth + gap)));
        setVisibleCount(count);
      }
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, [itemWidth, gap]);

  // Max index so there is NEVER empty space on the right
  const maxIndex = Math.max(0, items.length - visibleCount);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || items.length <= visibleCount) return;
    const interval = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, visibleCount, autoPlayInterval, items.length, handleNext]);

  // Total pages for dots
  const totalPages = maxIndex + 1;

  return (
    <div
      className={`framer-carousel-wrapper ${className}`}
      onMouseEnter={() => autoPlay && setIsPlaying(false)}
      onMouseLeave={() => autoPlay && setIsPlaying(true)}
    >
      {/* Top Controls bar */}
      <div className="framer-carousel__controls">
        <div className="framer-carousel__indicators">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`framer-carousel__dot ${idx === currentIndex ? 'framer-carousel__dot--active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="framer-carousel__arrows">
          <button
            onClick={handlePrev}
            className="framer-carousel__btn"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="framer-carousel__btn"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="framer-carousel__viewport" ref={containerRef}>
        <motion.div
          className="framer-carousel__track"
          animate={{
            x: -(currentIndex * (itemWidth + gap)),
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 28,
            mass: 0.7,
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="framer-carousel__item"
              style={{ width: itemWidth, marginRight: gap }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -6 }}
            >
              {renderItem(item, index, index >= currentIndex && index < currentIndex + visibleCount)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
