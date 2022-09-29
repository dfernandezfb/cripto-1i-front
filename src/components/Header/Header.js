import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {RiUserLine} from 'react-icons/ri'
import { useEffect, useState } from "react";
import './Header.css'

const Header = () => {
  const [headerClass, setHeaderClass] = useState('landing-navbar')
  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if(window.scrollY==0){
        setHeaderClass('landing-navbar-top')
      }else{
        setHeaderClass('landing-navbar-no-top')
      }
    })
  },[])

  const {pathname} = useLocation();

  return ( 
    <header>
    <Navbar className={headerClass} >
      <Container>
        {pathname==='/login'?
        <Navbar.Brand href="/" className="logo-app ms-auto me-auto">Cripto 1i</Navbar.Brand>
        :
        <>
        <Navbar.Brand href="/" className="logo-app">Cripto 1i</Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/login" className="nav-link primary-button btn d-flex align-items-center">Ingresar <RiUserLine className="ms-1"/></Link>
        </Nav>
        </>
        }
      </Container>
    </Navbar>
  </header>
);
}

export default Header;