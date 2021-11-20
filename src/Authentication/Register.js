import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useAuth } from "../context/Auth";
import { useHistory } from "react-router";
import classes from './Login.module.css'
import { registerUrl } from "../urls";
import useHttp from '../hooks/use-http'
import authHeader from "./headers";
import {userObj} from '../dataModels/userObj'
import { useEffect } from "react";
import { companyUrl } from "../urls";
const Register = () => {
  const {sendRequest} = useHttp()
  const history = useHistory()
  const { register, sendEmailToVerify } = useAuth();
  const [hasSubCompany, setHasSubCompany] = useState(false);
  const [companies , setCompanies]=useState([])
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const nameInputRef = useRef("");
  const phoneInputRef = useRef("");
  const websiteInputRef = useRef("");
  const companyNameInputRef = useRef("");
  const faxInputRef = useRef("");
  const toggleSubCompany = () => {
    setHasSubCompany((prev) => !prev);
  };
  const companyResponse =(response)=>{
    setCompanies(response)
  }
  const applyData =(response)=>{
    console.log(response)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const userEmail = emailInputRef.current.value;
    const userPassword = passwordInputRef.current.value;
    const userName = nameInputRef.current.value;
    const userCompany = companyNameInputRef.current.value;
    const userPhone = phoneInputRef.current.value;
    const userFax = faxInputRef.current.value;
    const userWebsite = websiteInputRef.current.value;
    console.log(userCompany)
    const registerUser= userObj(userName,
      userEmail,
      userCompany,
      userWebsite,
      userPhone,
      userFax) 
    register(userEmail, userPassword)
      .then((res) => {
       const accessToken = res._tokenResponse.idToken
       const refreshToken = res._tokenResponse.refreshToken
      
        sendEmailToVerify();
       sendRequest({url:registerUrl,method:'POST', headers : authHeader(accessToken) ,body:registerUser },applyData)

      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    sendRequest({url:companyUrl},companyResponse)
  },[])
  return (
    <Form onSubmit={handleSubmit}  className={classes.responsive} >
      <Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" placeholder="User name" ref={nameInputRef}/>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>
      </Row>
      <br />
     <Row>
          <Form.Group as={Col}>
            <Form.Select defaultValue="Choose" style={{width:'12rem'}} ref={companyNameInputRef} >
              <option>Choose...</option>
              {/* <option>...</option> */}
              {companies.map(company=>(
                <option key={company}> {company}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
      <br />
      {/* <Row>
        <Form.Group id="formGridCheckbox" as={Col}>
          <Form.Check
            type="checkbox"
            label="Sub company"
            onClick={toggleSubCompany}
          />
        </Form.Group>
      </Row>
     
      {hasSubCompany && (
        <Row>
          <Form.Group as={Col}>
            <Form.Select defaultValue="Choose" style={{width:'12rem'}}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>
      )}
       <br /> */}
      <Row>
      <Form.Group as={Col}>
          <Form.Label>Fax</Form.Label>
          <Form.Control type="tel" placeholder="Fax"  ref={faxInputRef} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="tel" placeholder="Number"  ref={phoneInputRef}/>
        </Form.Group>
      </Row>
      <Row>
       
        <Form.Group as={Col}>
          <Form.Label>Web address</Form.Label>
          <Form.Control type="text" placeholder="Web address"  ref={websiteInputRef} />
        </Form.Group>
      </Row>
      <br />
      <Button variant="info" type="Regiser" className="w-100">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
