
import { Button, Col, Row } from 'react-bootstrap';

const Footer = () => {

    return (
        <>


            < Row className="mt-4" >
                <Col className="text-center">
                    <Button variant="success" onClick={() => alert('Le gagnant est...')}>Terminer la manche</Button>
                </Col>
            </Row>


        </>

    );

};

export default Footer;