import { useEffect } from 'react';
import useSound from 'use-sound';
import setRandomInterval from '../../utils'
import soundFile from '../../assets/smoke-detector-beep.mp3'; // Make sure to replace this with the actual path to your sound file

export const Sound = () => {
  const [play] = useSound(soundFile);

  useEffect(() => {
    setRandomInterval(() => play(), 5000, 180000);
    
  }, [ play]);

  return (
    <div>
    </div>
  );
};
