import React, { useEffect, useRef } from 'react';
import { usePersonalization, InterestCategory } from '../../context/PersonalizationContext';

interface SectionTrackerProps {
  sectionId: string;
  interest?: InterestCategory;
  children: React.ReactNode;
}

export const SectionTracker: React.FC<SectionTrackerProps> = ({ 
  sectionId, 
  interest,
  children 
}) => {
  const { trackSectionClick, trackSectionTime, addInterest } = usePersonalization();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeInViewRef = useRef(0);
  const isInViewRef = useRef(false);
  const lastTimeUpdateRef = useRef(Date.now());
  
  // Track when section is clicked
  const handleClick = () => {
    trackSectionClick(sectionId);
    if (interest) {
      addInterest(interest);
    }
  };
  
  // Track when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const now = Date.now();
        
        if (entry.isIntersecting && !isInViewRef.current) {
          // Section just came into view
          isInViewRef.current = true;
          lastTimeUpdateRef.current = now;
        } else if (!entry.isIntersecting && isInViewRef.current) {
          // Section just went out of view
          isInViewRef.current = false;
          const timeSpent = Math.floor((now - lastTimeUpdateRef.current) / 1000);
          timeInViewRef.current += timeSpent;
          trackSectionTime(sectionId, timeSpent);
        }
      },
      { threshold: 0.2 } // Consider in view when 20% visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Update time spent periodically while in view
    const interval = setInterval(() => {
      if (isInViewRef.current) {
        const now = Date.now();
        const timeSpent = Math.floor((now - lastTimeUpdateRef.current) / 1000);
        
        if (timeSpent >= 5) { // Update every 5 seconds
          timeInViewRef.current += timeSpent;
          trackSectionTime(sectionId, timeSpent);
          lastTimeUpdateRef.current = now;
        }
      }
    }, 5000);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
      
      // Track remaining time when unmounting
      if (isInViewRef.current) {
        const timeSpent = Math.floor((Date.now() - lastTimeUpdateRef.current) / 1000);
        if (timeSpent > 0) {
          trackSectionTime(sectionId, timeSpent);
        }
      }
    };
  }, [sectionId, trackSectionTime]);
  
  return (
    <div ref={sectionRef} onClick={handleClick}>
      {children}
    </div>
  );
}; 