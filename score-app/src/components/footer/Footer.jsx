import { Button, Col, Row } from 'react-bootstrap';
import './footer.css';
import { useState } from 'react';
import ModalClassement from '../modal/modalClassement/ModalClassement';
import { usePlayers } from '../../context/PlayerContext';

const Footer = () => {
  const [showClassement, setShowClassement] = useState(false);
  const { players } = usePlayers();

  return (
    <>
      <Row className="text-center footer">
        <Col xs={12}>
          <Button
            variant="success"
            size='lg'
            onClick={() => setShowClassement(true)}
            disabled={players.length === 0}
          >
            Classement
          </Button>
        </Col>
      </Row>

      <ModalClassement show={showClassement} setShow={setShowClassement} />
    </>
  );
};

export default Footer;
