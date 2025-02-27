// // import React from 'react'
// // import video from '../../assets/video.mp4'
// // const HeroVideo = () => {
// //   return (
// //     <div>

// //     </div>
// //   )
// // }

// // export default HeroVideo

// import React, { useRef, useEffect } from 'react';
// import video from '../../assets/video.mp4';

// const HeroVideo = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     videoElement.loop = true;
//     videoElement.muted = true;
//     videoElement.playsInline = true;
//     videoElement.play();

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width;
//     const height = canvas.height;

//     const drawPaintFrame = () => {
//       ctx.clearRect(0, 0, width, height);
//       ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
//       ctx.lineWidth = 150;
//       ctx.lineCap = 'round';

//     //   // Top Paint Stroke
//     //   ctx.beginPath();
//     //   ctx.moveTo(10, 10);
//     //   ctx.quadraticCurveTo(width / 2, 20, width - 10, 10);
//     //   ctx.stroke();

//       // Right Paint Stroke
//       ctx.beginPath();
//       ctx.moveTo(width - 10, 10);
//       ctx.quadraticCurveTo(width - 20, height / 2, width - 10, height - 10);
//       ctx.stroke();

//       // Bottom Paint Stroke
//       ctx.beginPath();
//       ctx.moveTo(width - 10, height - 10);
//       ctx.quadraticCurveTo(width / 2, height - 20, 10, height - 10);
//       ctx.stroke();

//     //   // Left Paint Stroke
//     //   ctx.beginPath();
//     //   ctx.moveTo(10, height - 10);
//     //   ctx.quadraticCurveTo(20, height / 2, 10, 10);
//     //   ctx.stroke();

//       // Add variations for a more realistic paint frame
//     //   ctx.beginPath();
//     //   ctx.moveTo(width / 4, 15);
//     //   ctx.quadraticCurveTo(width/2, 5, width * 3/4, 15);
//     //   ctx.stroke();

//     //   ctx.beginPath();
//     //   ctx.moveTo(width -15, height/4);
//     //   ctx.quadraticCurveTo(width-5, height/2, width-15, height*3/4);
//     //   ctx.stroke();

//     };

//     drawPaintFrame();

//     // Optional: Animate the paint frame
//     const animatePaint = () => {
//       drawPaintFrame();
//       requestAnimationFrame(animatePaint);
//     }
//     //requestAnimationFrame(animatePaint); // uncomment to animate

//     return () => {
//       videoElement.pause();
//     };
//   }, []);

//   return (
//     <div style={{ position: 'relative', width: '50%', height: '100vh', overflow: 'hidden' }}>
//       <video
//       src={video}
//         ref={videoRef}
//         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//       />
//       <canvas
//         ref={canvasRef}
//         width="1000" // Adjust canvas width for paint strokes
//         height="1000" // Adjust canvas height for paint strokes
//         style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height:'100%' }}
//       />
//     </div>
//   );
// };

// export default HeroVideo;

import React, { useRef, useEffect } from 'react';
// import video from '../../assets/video.mp4';

const HeroVideo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const borderCanvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.play();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const borderCanvas = borderCanvasRef.current;
    const borderCtx = borderCanvas.getContext('2d');

    const drawOrganicShapes = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'orange'; // Very subtle orange

      const drawShape = (x, y, radius, offset) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = ((Math.PI * 2) / 6) * i;
          const offsetX = Math.cos(angle + offset) * 10;
          const offsetY = Math.sin(angle + offset) * 10;
          ctx.lineTo(
            x + Math.cos(angle) * radius + offsetX,
            y + Math.sin(angle) * radius + offsetY,
          );
        }
        ctx.closePath();
        ctx.fill();
      };

      const offset = Date.now() / 3000;

      // Organic shapes on the right
      for (let i = 0; i < 7; i++) {
        const x = width - 100 + i * 50;
        const y = (height / 4) * (i + 1);
        drawShape(x, y, 30 + i * 10, offset + i * 0.5);
      }

      // Organic shapes on the bottom
      for (let i = 0; i < 3; i++) {
        const x = width * (i + 1);
        const y = height - 100 + i * 50;
        drawShape(x, y, 30 + i * 10, offset + i * 0.3);
      }
    };

    const drawBorders = () => {
      borderCtx.clearRect(0, 0, width, height);
      borderCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      borderCtx.lineWidth = 30;
      borderCtx.lineCap = 'round';

      // Right Paint Stroke
      borderCtx.beginPath();
      borderCtx.moveTo(width - 10, 10);
      borderCtx.quadraticCurveTo(
        width - 20,
        height / 2,
        width - 10,
        height - 10,
      );
      borderCtx.stroke();

      // Bottom Paint Stroke
      borderCtx.beginPath();
      borderCtx.moveTo(width - 10, height - 10);
      borderCtx.quadraticCurveTo(width / 2, height - 20, 10, height - 10);
      borderCtx.stroke();
    };

    drawOrganicShapes();
    drawBorders();

    const animateShapes = () => {
      drawOrganicShapes();
      requestAnimationFrame(animateShapes);
    };
    requestAnimationFrame(animateShapes);

    return () => {
      videoElement.pause();
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '50%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <video
        src={video}
        ref={videoRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <canvas
        ref={borderCanvasRef}
        width="1000"
        height="1000"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      <canvas
        ref={canvasRef}
        width="1000"
        height="1000"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default HeroVideo;
