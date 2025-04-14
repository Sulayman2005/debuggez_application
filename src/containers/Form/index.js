import { useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); }); // création de l'élement mockContactApi pour la durée lors de l'envoie du message

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const handleSubmit = async (event) => { // fonction handleSubmit pour éviter de rafraîchir la page avec
  //  e.preventDefault et l'envoie du message lors du sucess et renvoie un message d'erreur lors du onError
    event.preventDefault();
    setSending(true);
    try {
      await mockContactApi();
      onSuccess(sending);
    } catch (err) {
      onError(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact_formulaire"> {/* appel de la fonction pour l'envoie du formualaire */}
      <div className="row">
        <div className="col">
          <Field 
            placeholder="Nom" 
            label="Nom" 
            name="lastName" 
          />
          <Field 
            placeholder="Prenom" 
            label="Prénom" 
            name="firstName" 
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field 
            placeholder="Email" 
            label="Email" 
            name="email" 
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field 
            placeholder="Entrez un message..." 
            label="Message" 
            name="message" 
            type={FIELD_TYPES.TEXTAREA} 
          /> 
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;

