import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {Container, Spinner, Table} from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SNavbar from '../../components/Navbar';
import SButton from '../../components/Button';
import axios from 'axios';
import { config } from '../../configs'

export default function PageCategories() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // console.log('data')
    // console.log(data)

    // console.log('token')
    // console.log(token)

    //use effect yang di running pertama kali ketika project dijalankan atau di refresh
    useEffect(() => {
      // console.log('useEffect')
      const getCategoriesAPI = async () => {
        setIsLoading(true)
        try{
          const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
            headers:{
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLoading(false)
          console.log(res.data.data)
          setData(res.data.data)
        }catch(err){
          setIsLoading(false)
          console.log(err)
        }
      }
  
      getCategoriesAPI()
    }, [])


    //jika tokennya tidak ada, suruh login dulu
    if(!token) return <Navigate to='/signin' replace={true} />
  return (
    <>
    {/* {console.log('render')} */}
    <SNavbar />
    <Container className='mt-3'>
    <SBreadCrumb textSecound='Categories'/>
   
    <SButton action={() => navigate('/categories/create')}>Tambah</SButton>

    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: 'center' }}>
                  <div className='flex items-center justify-center'>
                    <Spinner animation='grow' variant='light' />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
      </tbody>
    </Table>
    </Container>
    
    </>
  )
}
