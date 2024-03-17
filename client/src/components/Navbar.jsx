import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Models';
import { useState } from 'react';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
const Navbar = () => {
 
    const[cartView,setCartView]=useState(false);
    const data=useCart();
    const navigate=useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic">
                        Street Adda
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                        {(localStorage.getItem("authToken")) ? 
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/myOrder">
                                    My Orders
                                </Link>
                            </li>
                         : "" }   
                        </ul>
                        {(!localStorage.getItem("authToken")) ? 
                        <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1 " to="/login">
                                Login
                            </Link>
                            <Link className= "btn bg-white text-success mx-1"to="/signup">
                                Signup
                            </Link>
                 
                        </div>
                        :
                        <div>
                        <div className='btn bg-white text-success mx-2' onClick={() => setCartView(true)}>
                            My Cart { "  "}
                            <Badge pill bg="danger">
                                {data.length}
                            </Badge>
                        </div>
                        {cartView? <Modal onClose={() => setCartView(false)}><Cart /></Modal>:null}
                         
                        <div className='btn bg-white text-danger mx-2' onClick={() => {localStorage.removeItem("authToken")
                        navigate("/login")}}>
                            Logout
                        </div>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
