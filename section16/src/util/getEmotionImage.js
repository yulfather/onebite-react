import emotion1 from '../assets/emotion1.png';
import emotion2 from '../assets/emotion2.png';
import emotion3 from '../assets/emotion3.png';
import emotion4 from '../assets/emotion4.png';
import emotion5 from '../assets/emotion5.png';

const emotionMap = {
  1: emotion1,
  2: emotion2,
  3: emotion3,
  4: emotion4,
  5: emotion5,
};

export const getEmotionImage = (emotionId) => {
  return emotionMap[emotionId] || null;
};
