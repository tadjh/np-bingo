import confetti from 'canvas-confetti';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  onClose?: () => void;
}
// TODO write storybook story
export default function Coneftti({
  isActive = false,
  onClose,
}: ConfettiProps): JSX.Element | null {
  const appRoot = useRef(document.getElementById('root'));
  const app = useRef(document.getElementById('container'));
  const myCanvas = useRef(document.createElement('canvas'));
  myCanvas.current.setAttribute('id', 'canvas-confetti');
  myCanvas.current.setAttribute('class', 'absolute w-full h-full');
  const canvas = myCanvas.current;
  const target = app.current || appRoot.current;
  const duration = 15 * 1000; // theme song is 15 seconds

  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!isActive || target === null) return;

    target.appendChild(canvas);
    const myConfetti = confetti.create(canvas, {
      resize: true,
    });

    /**
     * Show confetti on the screen
     */
    function confettiAnimation() {
      const end = Date.now() + duration;

      (function frame() {
        myConfetti({
          particleCount: 4,
          angle: -90,
          spread: 360,
          origin: { x: 0.5, y: -0.3 },
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }

    if (!played) {
      confettiAnimation();
      setPlayed(true);
    }
    return function cleanup() {
      target.removeChild(canvas);
    };
  }, [isActive, played, target, canvas, duration]);

  if (!isActive) return null;
  return ReactDOM.createPortal(undefined, canvas);
}
