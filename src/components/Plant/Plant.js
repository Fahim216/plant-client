import React, { useContext, useState,useEffect } from 'react';
import { CardGroup ,Card} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from "./../../App";
const Plant = ({plant}) => {
    

const handleProductCost=(plant)=>{
    
    console.log('Product added',plant)
  
    
}






    // const deletePlant =id=>{
    //     fetch(`deleteProduct/${id}`,{
    //         method: 'DELETE'
    //     })
    //     .then(res=>res.json())
    //     .then(result=>{
    //         console.log ('deleted successfully')
    //     })
        
    // }
    return (
        <div className='col-lg-4 col-md-6 col-sm-12'>
            <CardGroup>
  <Card className="bg-success">
    <Card.Img style={{height:'500px',width:'100'}} variant="top" src={plant.imageUrl} />
    <Card.Body>
      <Card.Title className='text-white fs-2'>{plant.name}</Card.Title>
      <Card.Text>
        <h4>{plant.price}tk</h4>
      </Card.Text>
    </Card.Body>
    <Card.Footer className="bg-success">
    <button  className="btn btn-outline-danger btn btn-warning btn-lg" onClick={()=>handleProductCost(plant._id)}><Link to={`/order/${plant._id}`}>Buy Now</Link></button>
    {/* <button onClick={()=>deletePlant(plant._id)}>Delete</button> */}
    </Card.Footer>
  </Card>
  
</CardGroup>
        </div>
    );
};

export default Plant;