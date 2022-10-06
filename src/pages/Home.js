import { useContext, useEffect } from "react";
import { useState } from "react";
import InternHeader from "../components/InternHeader/InternHeader";
import axiosInstance from "../config/axiosInstance";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const {logout} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const getUsers = async()=>{
    try {
      const response = await axiosInstance.get('/users/allusers');
      setUsers(response.data.users)
    } catch (error) {
      alert('Error. Motivo: ' + error.message);
    }
  }
  useEffect(()=>{
    getUsers();
  },[])
  return ( <>
  <InternHeader/>
  {
    users.map(user=><h1>{user.name}</h1>) 
  }
  <button className="btn" onClick={logout}> Cerrar sesión</button>
  </>
  );
}
 
export default Home;