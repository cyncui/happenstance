"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypingAnimation(
  text: string,
  enabled: boolean,
  speed: number = 40
) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setDisplayText("");
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    setDisplayText("");
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, enabled, speed]);

  return { displayText, isComplete, reset };
}
