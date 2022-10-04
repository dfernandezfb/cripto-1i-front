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
      const response = await axiosInstance.post('/users/login',values);
      const data = response.data;
      console.log(data.token);
      setUser(data.user)
      setToken(data.token)
      setAuthenticated(true);
      localStorage.setItem('token',data.token);
    } catch (error) {
      console.log(error);
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
      }
      setUser(null)
      setToken(null)
      setAuthenticated(false);
      alert(`Error en la conexión. Motivo: ` + error.response.data.message);
    }
  }

  const getAuth = async()=>{
    const token = localStorage.getItem('token');
    if(token){
      axiosInstance.defaults.headers.common['authorization'] = token;
    }else{
      delete axiosInstance.defaults.headers.common['authorization'];
    }
    try {
      const response = await axiosInstance.get('/users/auth');
      const data = response.data;
      setUser(data.user);
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
      setUser(null);
      setToken(null);
      if(localStorage.getItem('token')){
        localStorage.removeItem('token');
      }
      alert('Error. Motivo: Falla en la autenticación');
    }
  }

  const logout = ()=>{
    setAuthenticated(false);
    setUser(null);
    setToken(null);
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
  }

  return <UserContext.Provider value={{
    //GUARDAS LA LOGICA Y LOS ESTADOS QUE QUIERAS COMPARTIR
    user,
    setUser,
    login,
    authenticated,
    token,
    getAuth,
    logout
  }}>
    {children}
  </UserContext.Provider>
}

export default UserProvider;