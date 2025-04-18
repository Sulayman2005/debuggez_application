import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) /* > au lieu de < pour mettre les dates de façon décroissant sur la slide, 
  dans le fichier helpers j'ai mis +1 pour commencer les mois au niveau 0 et pas au niveau 1 */
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
  } // message d'erreur si jamais il y a un problème lors de l'éxécution du code on retourne null

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={`slide-${event.id || idx}`} // modification de la key pour permettre d'avoir une clé unique à chaque fois 
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
            const Keyunique = event.id // création de Keyunique pour avoir une clé propre a chacun pour les breakpoints 
              ? `radio-${event.id}`
              : `radio-fallback-${radioIdx}-${event.date}`;

            return (
              <input
                key={Keyunique} // nom du paramètre Keyunique appelé
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

