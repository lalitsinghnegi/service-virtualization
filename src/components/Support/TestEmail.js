import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';
export const TestEmail = props => {

    const config = {
        useremail: null,
        password: null
      };
    
      const [mailconfig, setMailconfig] = useState(config);
     
  const submit = async (e) => {
    e.preventDefault();
/*
    sendTestMail(mailconfig).then(response=>{
      if(response){
         if (response.success) {
       
       
      } else {
        Swal.fire(
          'Error',
          response.message,
          'error'
        );
      }
      }
    }) */
  }

    return (
        <div>
         <Form onSubmit={submit} className='form-signin text-center white'>
         <FormGroup>
          <Label>SMTP_HOST</Label>
          <Input
            onInput={e => setMailconfig({ ...mailconfig, SMTP_HOST: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>PORT</Label>
          <Input
         
            onInput={e => setMailconfig({ ...mailconfig, PORT: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>SMTP_USER</Label>
          <Input
            onInput={e => setMailconfig({ ...mailconfig, SMTP_USER: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>SMTP_PASS</Label>
          <Input
            onInput={e => setMailconfig({ ...mailconfig, SMTP_PASS: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>SMTP_USER_FROM</Label>
          <Input
            onInput={e => setMailconfig({ ...mailconfig, SMTP_USER_FROM: e.target.value })}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>To</Label>
          <Input
            onInput={e => setMailconfig({ ...mailconfig, to: e.target.value })}
          />
        </FormGroup>
        <Button
          type='submit'
        >
          {' '}
         Send test mail{' '}
        </Button>
         </Form>
      </div>
      );

}