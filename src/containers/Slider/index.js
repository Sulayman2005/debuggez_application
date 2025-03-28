
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // je l'ai inversé pour qu'il soit dans l'ordre décroissant
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
    return () => clearTimeout(timer); // Nettoyage du timeout
  }, [index, byDateDesc]); // Dépendances ajoutées

  if (!byDateDesc || byDateDesc.length === 0) {
    return null; // ou un message de chargement
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={`slide-${event.id}`} // Clé unique
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
          {byDateDesc.map((_, radioIdx) => (
            <input
              key={`radio-${radioIdx}`} // Clé unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly // Ajouté car c'est contrôlé par le state
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

