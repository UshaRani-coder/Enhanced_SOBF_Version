import React from 'react';

const Video = () => {
  return (
    <>
      <div style={{ position: 'relative', paddingTop: '66.25%' /* 16:9 Aspect Ratio */, height: 0, overflow: 'hidden', width: '100%' }}>
        <iframe
          src="https://www.youtube.com/embed/txUnHFte34k?autoplay=1&mute=1"
          // style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%' , }}
          className='absolute top-0 left-0 w-[100%] h-[80%] lg:h-[50%]'
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title="Soul Of Braj Federation's 2nd Anniversary Celebration in Shri Vrindavan Dham | Food Distribution"
        />
      </div>
    </>

  );
}

export default Video;
