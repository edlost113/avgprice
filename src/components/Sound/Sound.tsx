import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import soundFile from '../../assets/craig.mp3'; // Make sure to replace this with the actual path to your sound file
import setRandomInterval from '../../utils';

export const Sound = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);

  const [play] = useSound(soundFile, {
    playbackRate,
    interrupt: true,
  });

  let playSound: boolean = false;
  useEffect(() => {
    if (!playSound) {
      playSound = true;
      setRandomInterval(
        () => {
          setPlaybackRate(playbackRate + 0.1);
          play();
        },
        30,
        145
      );
    }
  }, [play]);

  return <div id="sound" />;
};
