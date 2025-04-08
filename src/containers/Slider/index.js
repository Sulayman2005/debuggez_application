import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) // > au lieu de < pour mettre les dates de façon décroissant sur la slide
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
    const timer = setTimeout(nextCard, 5000); // timer pour la nextcard dans le useEffect avec un temps imparti lors du changement de slide
    return () => clearTimeout(timer); // timer effacer après que la slide sois terminé
  }, [index, byDateDesc]);

  if (!byDateDesc || byDateDesc.length === 0) {
    return null;
  } // message d'erreur si jamais il y a un problème lors de l'éxécution du code

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={`slide-${event.id || idx}`} // modification de la key
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
            const uniqueKey = event.id // création de uniqueKey pour avoir une propre a chacun
              ? `radio-${event.id}`
              : `radio-fallback-${radioIdx}-${event.date}`;
            
            return (
              <input
                key={uniqueKey} // nom du paramètre uniqueKey appelé
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                readOnly // pour améliorer le rendu et éviter de bloquer de le rendu de la page
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;

