import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth( new Date(date))}</div>{/* date renseigner sur la modal */}
      </div>
    </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string, // Suppression de l'élément ".isREquired" car on a définit imageSrc juste en bas dans defaultProps
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string, // Suppression de l'élément ".isRequired" car on a définit title juste en bas dans defaultProps
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  imageSrc: "insert image", // Intialisation de imageSrc pour le définir
  title: "titre", // Initialisation de title pour le définir 
}

export default EventCard;
