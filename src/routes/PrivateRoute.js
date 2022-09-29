import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const PrivateRoute = ({children})=>{
  const {authenticated} = useContext(UserContext);

  return authenticated? children : <Navigate to='login'/>
}

export default PrivateRoute;