// PixiComponentWithInput.js
import React, { useRef, useEffect } from 'react';
import { PixiComponent } from '@inlet/react-pixi';

const Home = ({ x, y, width, height }) => {
  const spriteRef = useRef(null);

  const handleKeyDown = (event) => {
    const sprite = spriteRef.current;

    if (sprite) {
      const speed = 5;

      switch (event.key) {
        case 'ArrowUp':
          sprite.y -= speed;
          break;
        case 'ArrowDown':
          sprite.y += speed;
          break;
        case 'ArrowLeft':
          sprite.x -= speed;
          break;
        case 'ArrowRight':
          sprite.x += speed;
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    // Add event listeners when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listeners when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <PixiComponent
      draw={(g) => {
        g.clear();
        g.beginFill(0xFF3300);
        g.drawRect(x, y, width, height);
        g.endFill();
      }}
      ref={spriteRef}
    />
  );
};

export default Home;

