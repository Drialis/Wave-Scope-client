import beachServices from '../../services/beach.services'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ModalDelete = ({ show, handleClose }) => {


    const navigate = useNavigate()

    const deleteBeach = () => {
        beachServices
            .delete(`/beaches/${beach._id}`)
            .then(() => {
                handleClose()
                navigate(`/beaches`)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Modal className="ModalDelete" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action will delete this beach</Modal.Body>
                <Modal.Footer>
                    <Button className='custom-color-button' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='custom-color-button' onClick={deleteBeach}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete