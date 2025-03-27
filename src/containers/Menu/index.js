/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul className="item_element">
      <li title="nos services">
        <a href="#nos-services">Nos services</a>
      </li>
      <li title="nos réalisations">
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li title="notre-equipe">
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    <Button title="contact" onClick={() => (window.document.location.hash = "#contact")}>
      Contact
    </Button>
  </nav>
);

export default Menu;
