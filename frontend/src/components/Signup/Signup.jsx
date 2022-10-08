import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./Signup.module.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

//   useEffect(()=>{
 
//   },[name,email,description,location]);

  return (

      <Form className={`${styles.form}`}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(event)=>{setName(event.target.value)}} className={`${styles.input}`}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=>{setEmail(event.target.value)}} className={`${styles.input}`}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Location" value={location} onChange={(event)=>{setLocation(event.target.value)}} className={`${styles.input}`}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" value={description} onChange={(event)=>{setDescription(event.target.value)}} className={`${styles.input}`} minLength="50"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" className={`${styles.input}`} accept="image/*"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button className={`btn btn-primary btn-lg`} type="submit">
          Submit
        </Button>
      </Form>
  );
}
