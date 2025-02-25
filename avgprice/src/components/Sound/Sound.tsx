import { useEffect } from 'react';
import useSound from 'use-sound';
import setRandomInterval from '../../utils'
import soundFile from '../../assets/craig.mp3'; // Make sure to replace this with the actual path to your sound file

export const Sound = () => {
  const [play] = useSound(soundFile);
  let playSound: Boolean = false;
  useEffect(() => {
    if (!playSound) {
      playSound = true;
      setRandomInterval(() => {
        console.log(new Date().toISOString());
        play();
      }, 30, 45);
    }
  }, [ play]);

  return (
    <div id="sound">
    </div>
  );
};
