import React from 'react';
import { Nav } from 'react-bootstrap';

function NavLink({ action, children }) {
//   let isHas = roles.indexOf(role);
  return <>
  <Nav.Link onClick={action}>{children}</Nav.Link>
  </>;
}

export default NavLink;