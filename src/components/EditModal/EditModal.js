import { useEffect } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import axiosInstance from "../../config/axiosInstance";
import { ADD_CRYPTO_VALUES } from "../../constants";
import useForm from "../../hooks/useForm";

const EditModal = ({show, setShow, getCoins,selected}) => {
  const handleClose = () => setShow(false);

  const getCoin = async()=>{
    try {
      const response = await axiosInstance.get('/coins/'+ selected);
      setValues(response.data.coin)
    } catch (error) {
      alert('Error al traer la info de la cripto')
    }
  }
  
  const editCrypto = async()=>{
    try {
      await axiosInstance.put('/coins/' + selected ,{update:values});
      getCoins()
    } catch (error) {
      alert('Error al editar la cripto')
    }
  }

  useEffect(()=>{
    getCoin()
  },[selected]);
  const {handleChange, handleSubmit, values, setValues} = useForm(ADD_CRYPTO_VALUES,editCrypto);


  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar criptomoneda</Modal.Title>
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
              value={values.name}
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
              value={values.abbr}
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
              value={values.price}
              required
            />
          </FloatingLabel>
        </Modal.Body>
          <Button variant="primary" type="submit" className="m-3"onClick={handleClose}>
            Editar cripto
          </Button>
          </form>
      </Modal>
  )
}
 
export default EditModal;