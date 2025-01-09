import { Form, Modal } from "react-bootstrap";
import { usePlayers } from "../../../context/PlayerContext";


const ModalOptions = ({ show, setShow }) => {

    const { allowNegativeScores, getAllowNegativeScores } = usePlayers();

    return (

        <>

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
                            checked={getAllowNegativeScores()}
                            onChange={(e) => allowNegativeScores(e.target.checked)}
                        />
                    </Form>
                </Modal.Body>
            </Modal>




        </>

    )

}

export default ModalOptions;
