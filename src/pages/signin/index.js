import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SAlert from '../../components/Alert';
import SForm from './form';

import { config } from '../../configs'

function PageSignin() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState({
      status: false,
      message: '',
      type: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.name)
        // console.log(e.target.value)
        // console.log(e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
      //saat click maka di set jadi true
      setIsLoading(true);
        try{
            const res = await axios.post(
                `${config.api_host_dev}/cms/auth/signin`,
                form
            );
            console.log(res.data.data)
            //jika udah sukses maka set loading jadi false
            localStorage.setItem('token', res.data.data)
            setIsLoading(false);
            navigate('/');
        }catch(err){
          //jika ada yang error maka set loading jadi false
          setIsLoading(false);
            console.log(err.response.data.msg)
            setAlert({
              status: true,
              message: err?.response?.data?.msg ?? 'Internal server error',
              type: 'danger',
            });
        }
      };

      //jika tokennya ada balikki ke dashboard
      if(token) return <Navigate to='/' replace={true} />

  return (
    <Container md={12} className='my-5'>
    <div className='m-auto' style={{ width: '50%' }}>
    {/* jika statusnya true maka akan muncul alert message  */}
      {alert.status && <SAlert message={alert.message} type={alert.type} />}
    </div>
    <Card style={{ width: '50%' }} className='m-auto mt-5'>
    <Card.Body>
    <Card.Title className='text-center'>Form Login</Card.Title>
    <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
    </Card.Body>
  </Card>
    </Container>
    
  );
}

export default PageSignin;