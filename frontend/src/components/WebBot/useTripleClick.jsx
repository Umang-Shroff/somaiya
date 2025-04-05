// src/hooks/useTripleClick.js
import { useEffect, useRef } from 'react';
import { getHierarchicalContent,highlightElement,logCapture } from './domUtils';


const useTripleClick = (callback, options = {}) => {
  // Configurable timing (default: 500ms between clicks)
  const { clickWindow = 500, highlightDuration = 3000 } = options;
  const clicksRef = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.button !== 0) return; // Only left clicks

      // Record click with timestamp
      clicksRef.current = [
        ...clicksRef.current.slice(-2), // Keep only last 2 clicks
        { time: Date.now(), target: e.target }
      ];

      // Clear any existing timeout
      clearTimeout(timeoutRef.current);

      // Check for triple click within time window
      if (clicksRef.current.length === 3) {
        const [first, second, third] = clicksRef.current;
        const isValidTripleClick = 
          third.time - first.time <= clickWindow && 
          first.target === second.target && 
          second.target === third.target;

        if (isValidTripleClick) {
          const { content, structure, boundaryElement, graphType } = 
            getHierarchicalContent(e.target);
          
          highlightElement(boundaryElement, highlightDuration, !!graphType);
          logCapture(content, boundaryElement, structure, graphType);

          callback({
            element: e.target,
            content,
            structure,
            boundaryElement,
            graphType
          });
        }
        clicksRef.current = []; // Reset after check
      } else {
        // Set timeout to reset clicks if too slow
        timeoutRef.current = setTimeout(() => {
          clicksRef.current = [];
        }, clickWindow);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      clearTimeout(timeoutRef.current);
    };
  }, [callback, clickWindow, highlightDuration]);
};

export default useTripleClick;