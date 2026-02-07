import './EmotionItem.css';
import { getEmotionImage } from '../util/get-emotion-image';

function EmotionItem({ emotionId, emotionName, isSelected }) {
  return (
    <div
      className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ''}`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <h4 className="emotion_name">{emotionName}</h4>
    </div>
  );
}

export default EmotionItem;
