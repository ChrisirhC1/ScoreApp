import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import './confetti.css';

const Confetti = ({ showEasterEgg }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showEasterEgg) {
      setIsExiting(false);
      setIsVisible(true);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showEasterEgg]);

  if (!isVisible) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      gravity={0.2}
      className={"confetti " + (isExiting ? "exit" : "enter")}
    />
  );
};

export default Confetti;
