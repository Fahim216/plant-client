import React, { useEffect, useState } from 'react';
import Plant from '../Plant/Plant';



const Home = () => {


const[plants,setPlants]=useState([]);
useEffect(()=>{
fetch(`http://localhost:4042/plants`)
.then(res=>res.json())
.then(data=>{
    setPlants(data)
    console.log(data)})



},[setPlants])



    return (
        <div className="row">
            {
                plants.map(plant=><Plant plant={plant}></Plant>)
            }
           
        </div>
    );
};

export default Home;