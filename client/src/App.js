import { useState } from "react";
import React from 'react';
import { FormGroup, Input, Label, Button } from "reactstrap";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    try {
      await axios.post('/api/form', {
        Name: formData.Name,
        Email: formData.Email,
        Message: formData.Message
      });

      // Do something with the response if needed
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Email">Email:</Label>
        <Input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Message">Message:</Label>
        <Input
          type="textarea"
          name="Message"
          placeholder="Message"
          value={formData.Message}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </FormGroup>
      {submitted && <h1>Welcome {formData.Name} {formData.Email}!</h1>}
    </form>
  );
}

export default App;
