import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useAuth } from "../../context/Auth";
export default function FailLoginModal(props) {
    const {sendEmailToVerify}=useAuth()
    const resendEmail = ()=>{
        sendEmailToVerify()
        props.onHide()
    }
  return (
    <>
      <Modal
      {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Email has not been varified
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Please verify your email</h4>
          <p style={{color:'black'}}>
           We have sent you an email for varification.
           
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="info" onClick={resendEmail}>Resend</Button>
          <Button variant="info" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
