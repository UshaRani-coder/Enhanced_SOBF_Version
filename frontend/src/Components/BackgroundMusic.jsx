import React, { useRef, useEffect } from 'react';
import audio from '../assets/soothingMusic.mp3';

const BackgroundMusic = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.log("Autoplay is blocked or failed.");
                }
            }
        };

        playAudio();
    }, []);

    return (
        <audio
            ref={audioRef}
            src={audio}
            loop
            volume={0.5}
            style={{ display: 'none' }}
        >
            Your browser does not support the audio element.
        </audio>
    );
};

export default BackgroundMusic;
