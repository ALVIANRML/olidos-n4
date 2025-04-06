import React from 'react';
import '../assets/css/login.css'
import logo from '../assets/img/logo.svg';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login() {
  return (
    <div className='login-page'>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='transparent my-5 mx-auto prl ' style={{borderRadius: '1rem', maxWidth: '950px', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <div className="fw-bold mb-2 text-center"></div>
              <img className='mb5' src={logo} alt="Logo" />
              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn style={{backgroundColor:'#1B732E'}} size='lg'>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
  
}

export default Login;