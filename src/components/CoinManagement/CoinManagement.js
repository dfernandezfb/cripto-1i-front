import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import axiosInstance from "../../config/axiosInstance";
import AddModal from "../AddModal/AddModal";
import EditModal from "../EditModal/EditModal";
import './CoinManagement.css'

const CoinManagement = () => {
  const [coins, setCoins] = useState(null);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);

  const getCoins = async()=>{
    try {
      const response = await axiosInstance.get('/coins');
      console.log(response.data);
      setCoins(response.data.coins)
    } catch (error) {
      alert('Error al traer las monedas');
    }
  }

  const deleteCoin = async()=>{
    try {
      await axiosInstance.delete('/coins',{data:{id:selected}});
      getCoins();
    } catch (error) {
      alert('Error al eliminar la moneda')
    }
  }

  useEffect(()=>{
    getCoins();
  },[])
  return (
    <>
    <div className="d-flex justify-content-around my-3">
      <Button variant="success" onClick={handleShow} className="mx-3">Agregar cripto</Button>
      <Button variant="warning" onClick={handleShowEdit} className="mx-3">Editar cripto</Button>
      <Button variant="danger" onClick={deleteCoin} className="mx-3">Eliminar cripto</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Abreviación</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {
          coins?.map(coin=>
            coin._id==selected?
          <tr className='selected' onClick={()=>setSelected(coin._id)} key={coin._id}>
            <td>{coin._id}</td>
            <td>{coin.name}</td>
            <td>{coin.abbr}</td>
            <td>{coin.price}</td>
          </tr>:
          <tr onClick={()=>setSelected(coin._id)} key={coin._id}>
          <td>{coin._id}</td>
          <td>{coin.name}</td>
          <td>{coin.abbr}</td>
          <td>{coin.price}</td>
        </tr>
        )
      }
      </tbody>
    </Table>
    <AddModal show={show} setShow={setShow} getCoins={getCoins}/>
    <EditModal show={showEdit} setShow={setShowEdit} getCoins={getCoins} selected={selected}/>
      </> 
  );
}
 
export default CoinManagement;