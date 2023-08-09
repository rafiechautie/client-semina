import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SBreadCrumb({ textSecound, textThird, urlSecound }) {
  const navigate = useNavigate();
  return (
    <Breadcrumb className='my-2'>
      <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
      {/* memberikan active ketika textthirdnya tidak ada  */}
      {!textThird && <Breadcrumb.Item active>{textSecound}</Breadcrumb.Item>}
      {/* memberikan link jika textThirdnya tidak ada yang membuat user bisa kembali ke halaman sebelumnya  */}
      {textThird && (
        <Breadcrumb.Item onClick={() => navigate(urlSecound)}>
          {textSecound}
        </Breadcrumb.Item>
      )}
      {textThird && <Breadcrumb.Item active>{textThird}</Breadcrumb.Item>}
    </Breadcrumb>
  );
}

export default SBreadCrumb;