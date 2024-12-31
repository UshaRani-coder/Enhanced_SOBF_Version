import React from "react";

const Video = () => {
  return (
    <>
      <h1 className="text-center mt-5 mb-5 text-[#2d335d]  text-heading3 lg:text-heading2 font-bold px-5 pt-5 text-logo-yellow relative z-10">
         Our Featured Videos
        <hr className="mt-1 border-light-lavender border-[0.5px]" />
      </h1>
      <div className="video-section py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video 1 */}
          <div className="video-container aspect-w-16 aspect-h-9 ">
            <iframe
              width="400"
              height="300"
              className="rounded-lg"
              src="https://www.youtube.com/embed/ALMEHI7ET1I?si=gJjQAqYsGlEUdML0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          {/* Video 2 */}
          <div className="video-container aspect-w-16 aspect-h-9">
            <iframe
              width="400"
              height="300"
              className="rounded-lg"
              src="https://www.youtube.com/embed/6mVy1uUoEIA?si=qw9mBv91HYEQaivr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          {/* Video 3 */}
          <div className="video-container aspect-w-16 aspect-h-9">
            <iframe
              width="400"
              height="300"
              className="rounded-lg"
              src="https://www.youtube.com/embed/fdw-6OefRTw?si=hY2SqpnZxduGCeW6"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;