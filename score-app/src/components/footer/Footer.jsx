
import { Button, Col, Row } from 'react-bootstrap';
import './footer.css';
import { useState } from 'react';
import ModalClassement from '../modal/modalClassement/ModalClassement';

const Footer = () => {

    const [showClassement, setShowClassment] = useState(false);

    return (
        <>
            <Row className="text-center footer">
                <Col xs={12}>


                    <Button variant="success" size='lg' onClick={() => setShowClassment(!showClassement)}>classement</Button>


                </Col>
            </Row>


            <ModalClassement show={showClassement} setShow={() => setShowClassment(!showClassement)} />
        </>
    );
};

export default Footer;