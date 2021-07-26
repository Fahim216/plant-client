import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddPlant = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageUrl,setImageUrl]=useState(null)
  const onSubmit = data => {
      const eventData ={
          name:data.name,
          price:parseInt(data.price),
          imageUrl:imageUrl

      };
      const url=`http://localhost:4042/addPlant`;
    console.log(eventData)
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(res=>console.log(res,'server side response'))
};
  const handleImageUpload=event => {
      console.log (event.target.files)

      const imageData=new FormData();
      imageData.set('key','06d3bfae1b6a2dda58d19e35a111e5ba');
      imageData.append("image",event.target.files[0])

      axios.post('https://api.imgbb.com/1/upload', 
      imageData)
     
        .then(function (response) {
            console.log (response.data.data.display_url);

          setImageUrl(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });

  }

    return (
        <div className="p-5 bg-secondary border rounded position-absolute top-50 start-50 translate-middle">
        <form onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue="New Plant" {...register("name")} />
      <br /> <br />  
      <input name="price" defaultValue="price" {...register("price")} /><br /><br />
      <input type='file' onChange={handleImageUpload} />
     
      {errors.exampleRequired && <span>This field is required</span>}
      <br /><br />
      <input type="submit" />
    </form>
    </div>
    );
};

export default AddPlant;