import {createContext, useState} from 'react';
import axiosInstance from '../config/axiosInstance';

export const UserContext = createContext();

const UserProvider = ({children})=>{
  //HACES LOGICA Y ESTADOS QUE QUIERAS COMPARTIR
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authenticated,setAuthenticated] = useState(false)

  const login = async(values)=>{
    try {
      const response = await axiosInstance.post('/users',values);
      const data = response.data;
      setUser(data.user)
      setToken(data.token)
      setAuthenticated(true);
      localStorage.setItem('token',data.token);
    } catch (error) {
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
      }
      setUser(null)
      setToken(null)
      setAuthenticated(false);
      alert(`Error en la conexión. Motivo: ` + error.message);
    }
  }

  return <UserContext.Provider value={{
    //GUARDAS LA LOGICA Y LOS ESTADOS QUE QUIERAS COMPARTIR
    user,
    setUser,
    login,
    authenticated,
    token
  }}>
    {children}
  </UserContext.Provider>
}

export default UserProvider;