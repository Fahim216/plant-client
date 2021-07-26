import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from "./../../App";


const ProductAmount = (plant) => {
    const[loggedInUser,setLoggedInUser]=useContext(UserContext)
    

    return (
        <div>
      
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>{plant.price}</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    
  </tbody>
</Table>
        </div>
    );
};

export default ProductAmount;