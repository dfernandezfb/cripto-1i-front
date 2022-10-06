import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'
import useMediaQuery from '../../hooks/useMediaQuery';
import './InternHeader.css'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


const InternHeader = () => {
  const {logout, user} = useContext(UserContext);
  const {width} = useMediaQuery();
  return (
    width<576?
    <Navbar expand='md' className='bg-azul-oscuro'>
      <Container>
        <Navbar.Brand href="/home" className="logo-app">Cripto 1i</Navbar.Brand>
        <Navbar.Toggle className='primary-button' aria-controls="intern-header">MENU<FaBars/></Navbar.Toggle>
          <Navbar.Collapse id="intern-header">
            <Nav className="me-auto">
              <Link to="/home" className="nav-link text-light">Inicio</Link>
              <Link to="/favs" className="nav-link text-light">Tus favoritas</Link>
              {
                user.role==='ADMIN'?
                <Link to="/admin" className="nav-link text-light">Administración</Link>
                :
                null
              }
              <Link to='' onClick={logout} className="nav-link text-light">Cerrar sesión</Link>
            </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    :
    <header>
      <Navbar className='bg-azul-oscuro lateral-nav' >
        <Container className='d-flex flex-column'>
          <Navbar.Brand href="/home" className="logo-app mb-3">Cripto 1i</Navbar.Brand>
          <Nav className="ms-auto me-auto d-flex flex-column">
            <Link to="/login" className="nav-link text-light d-flex justify-content-center">Inicio</Link>
            {
              user.role==='ADMIN'?
              <Link to="/admin" className="nav-link text-light">Administración</Link>
              :null
            }
            <Link to="/favs" className="nav-link text-light d-flex justify-content-center">Tus favoritas</Link>
            <Link to="" onClick={logout} className="nav-link primary-button btn">Cerrar sesión</Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
   );
}
 
export default InternHeader;

