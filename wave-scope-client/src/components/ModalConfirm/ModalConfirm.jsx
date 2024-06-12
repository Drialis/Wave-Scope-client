import { Button, Modal } from 'react-bootstrap'

const ModalConfirm = ({
    show,
    handleClose,
    handleConfirm,
    titleMessage,
    bodyMessage,
    buttonMessage }) => {

    return (
        <Modal className="ModalConfirm"
            show={show}
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{titleMessage}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyMessage}</Modal.Body>
            <Modal.Footer>
                {handleClose !== handleConfirm &&
                    <Button className='custom-color-button' onClick={handleClose}>
                        Cancel
                    </Button>}
                <Button className='delete-color-button' onClick={handleConfirm}>
                    {buttonMessage}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm