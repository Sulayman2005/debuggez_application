import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (!byDateDesc) return;
    
    setTimeout(
      () => setIndex(prevIndex => 
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      ),
      5000
    );
  };

  useEffect(() => {
    const timer = nextCard();
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);

  if (!byDateDesc || byDateDesc.length === 0) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={`slide-${event.id || idx}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => {
            const uniqueKey = event.id 
              ? `radio-${event.id}`
              : `radio-fallback-${radioIdx}-${event.date}`;
            
            return (
              <input
                key={uniqueKey}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                readOnly
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;

