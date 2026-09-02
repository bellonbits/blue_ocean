import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { onboardingSlides } from './onboardingSlides';
import './OnboardingFlow.css';

const SWIPE_THRESHOLD = 60;

export default function OnboardingFlow({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;

  const goTo = (next) => {
    if (next < 0 || next >= onboardingSlides.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (_e, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  };

  return (
    <div className="onboarding" role="dialog" aria-label="Welcome to Blue Ocean Somalia">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          className="onboarding__slide"
          custom={direction}
          initial={{ opacity: 0, x: direction * 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -48 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65}
          onDragEnd={handleDragEnd}
        >
          <div className="onboarding__media">
            <img src={slide.image} alt="" />
            <div className="onboarding__scrim" />
          </div>

          <div className="onboarding__content">
            <span className="onboarding__eyebrow">{slide.eyebrow}</span>
            <h1 className="onboarding__title">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
            <p className="onboarding__body">{slide.body}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="onboarding__footer">
        <div className="onboarding__dots">
          {onboardingSlides.map((s, i) => (
            <button
              key={s.id}
              className={`onboarding__dot ${i === index ? 'onboarding__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="onboarding__actions">
          {!isLast && (
            <button className="onboarding__skip" onClick={onComplete}>
              Skip
            </button>
          )}
          <button
            className="onboarding__next"
            onClick={() => (isLast ? onComplete() : goTo(index + 1))}
          >
            <span>{isLast ? 'Get Started' : 'Next'}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
