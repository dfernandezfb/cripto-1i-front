import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosInstance";
import { ADD_CRYPTO_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";

const AddModal = ({show, setShow, getCoins}) => {
  const handleClose = () => setShow(false);
  
  const addCrypto = async()=>{
    try {
      await axiosInstance.post('/coins',values);
      getCoins()
    } catch (error) {
      alert('Error al agregar la cripto')
    }
  }
  const {handleChange, handleSubmit, values} = useForm(ADD_CRYPTO_VALUES,addCrypto);


  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar criptomoneda</Modal.Title>
        </Modal.Header>
          <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre"
            className="mb-3 w-100"
          >
            <Form.Control
              type="text"
              placeholder="Pepito"
              className=""
              onChange={handleChange}
              name='name'
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Abreviación"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="PPO"
              className=""
              onChange={handleChange}
              name='abbr'
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Precio"
            className="mb-3 w-100"
          >
            <Form.Control
              type="number"
              placeholder="100"
              className=""
              onChange={handleChange}
              name='price'
              required
            />
          </FloatingLabel>
        </Modal.Body>
          <Button variant="primary" type="submit" className="m-3"onClick={handleClose}>
            Agregar cripto
          </Button>
          </form>
      </Modal>
  )
}
 
export default AddModal;