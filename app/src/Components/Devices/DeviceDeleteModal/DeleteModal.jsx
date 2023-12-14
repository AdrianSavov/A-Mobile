import { Modal, Button } from 'react-bootstrap';
import './DeleteModal.css';

const ConfirmationModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className='modal-title'>Confirm Deletion</div>
      </Modal.Header>
      <Modal.Body className='text-confirmation'>Are you sure you want to delete this device?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
