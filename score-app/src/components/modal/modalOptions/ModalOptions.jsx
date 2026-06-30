import { Form, Modal } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";
import { useTheme } from "../../../context/ThemeContext";

const ModalOptions = ({ show, setShow }) => {
  const { allowNegativeScores, isNegativeScore } = usePlayers();
  const { theme, toggleTheme } = useTheme();

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            id="negative-scores-switch"
            label="Autoriser les nombres négatifs"
            checked={isNegativeScore}
            onChange={(e) => allowNegativeScores(e.target.checked)}
            className="mb-3"
          />
          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === "dark" ? "🌙 Mode sombre" : "☀️ Mode clair"}
            checked={theme === "light"}
            onChange={toggleTheme}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalOptions;
