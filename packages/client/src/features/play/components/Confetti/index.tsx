import confetti from 'canvas-confetti';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { usePortal } from '../../Utils/custom-hooks';

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  onClose?: () => void;
}

export default function Coneftti({
  isActive = false,
  onClose,
  children,
}: ConfettiProps): JSX.Element | null {
  const appRoot = useRef(document.getElementById('root'));
  const app = useRef(document.getElementById('App'));
  const myCanvas = useRef(document.createElement('canvas'));
  myCanvas.current.setAttribute('id', 'canvas-confetti');
  myCanvas.current.setAttribute(
    'class',
    'absolute top-0 left-0 bottom-0 right-0 max-w-md mx-auto min-h-screen'
  );
  const canvas = myCanvas.current;
  const target = app.current || appRoot.current;
  const duration = 15 * 1000; // theme song is 15 seconds

  const [played, setPlayed] = useState(false);

  // const canvas = usePortal(target);

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
