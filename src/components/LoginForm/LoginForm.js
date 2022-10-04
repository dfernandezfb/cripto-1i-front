import { useEffect } from 'react';
import { useContext } from 'react';
import { FloatingLabel, Form, Button, Alert } from 'react-bootstrap';
import {BiUserPin} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { LOGIN_INITIAL_VALUES } from '../../constants';
import { UserContext } from '../../context/UserContext';
import { validationLogin } from '../../helpers/validations';
import useForm from '../../hooks/useForm';
import './LoginForm.css'

const LoginForm = () => {
  const {login, authenticated} = useContext(UserContext);
  const navigate = useNavigate();
  const {values, handleChange, handleSubmit, errors} = useForm(LOGIN_INITIAL_VALUES,login, validationLogin);

  useEffect(()=>{
    if(authenticated){
      navigate('/home');
    }
  },[authenticated])
  
  return ( 
    <>
    <div className="login-portada">
      <div className="login-portada-text">
        <BiUserPin className="login-icon" />
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Dirección de correo electrónico"
            className="mb-3 w-100"
          >
            <Form.Control
              type="email"
              placeholder="nombre@ejemplo.com"
              className="login-input w-100"
              onChange={handleChange}
              name='email'
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Contraseña">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              className="login-input"
              onChange={handleChange}
              name='password'
              required
            />
          </FloatingLabel>
          <Button className="primary-button" type="submit"> Ingresar</Button>
          {
            Object.keys(errors).length!=0?
              Object.values(errors).map(error=> <Alert variant='danger'>{error}</Alert>)
              :
              null

          }
        </form>
      </div>
    </div>
  </>
  );
}
 
export default LoginForm;