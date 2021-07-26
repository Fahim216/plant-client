import React, { useContext, useState } from 'react';
import "firebase/auth";
import firebase from "firebase/app";
import { UserContext } from "./../../App";
import firebaseConfig from "./firebaseConfig";
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
      isSignedIn: false,
      name: "",
      email: "",
      photo: "",
      error: "",
      success: false,
    });
  
    const[loggedInUser,setLoggedInUser]=useContext(UserContext)
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig)
    }
    let history = useHistory();
  let location = useLocation();
 

  let { from } = location.state || { from: { pathname: "/" } };
    const handleSubmit=(e) => {
        if (newUser && user.email && user.password) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(user.email, user.password)
              .then((res) => {
                const newUserInfo = { ...user };
                newUserInfo.error = "";
                newUserInfo.success = true;
                setUser(newUserInfo);
               
              })
              .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
      
                // ..
              });
          }
          if (!newUser && user.email && user.password) {
            firebase
              .auth()
              .signInWithEmailAndPassword(user.email, user.password)
              .then((res) => {
                const newUserInfo = { ...user };
                newUserInfo.error = "";
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                console.log("sign in user info", res.user);
      
                // Signed in
                // ...
              })
              .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
          }
          e.preventDefault();
    }
const handleBlur=(e)=>{
    let isFieldValid = true;

    // console.log(e.target.name,e.target.value)

    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passWordNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passWordNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

}
    const handleGoogleSignIn=()=>{
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(GoogleProvider)
  .then((result) => {
   
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
   const {displayName,email}=result.user;
   const signInUser={name:displayName,email:email}
   setLoggedInUser(signInUser);
   history.replace(from);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
   }
    return (


    
        <div className="p-5 bg-info m-5 position-absolute top-50 start-50 translate-middle border border-warning">
            {/* <p>name:{loggedInUser.email}</p> */}
        <h1>Login </h1>
        <form  onSubmit={handleSubmit}  action="">
        <input type="checkbox"onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User Sign up</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="type your name"
          />
        )}
        <br />   <br />
            <input type="text" onBlur={handleBlur} name="email" id=""placeholder="Email"required />
           <br />   <br />
            <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password"required />
            <br />   <br />
            <input type="submit" value={newUser ? "Sign Up" : "Log in"} />
            <br />
            <p style={{ color: "red" }}>{user.error}</p>
        {user.success && (
          <p style={{ color: "green", border: "1px solid green" }}>
            User {newUser ? "Created" : "Logged In"} successfully
          </p>
        )}
        </form>
       <div> <button onClick={handleGoogleSignIn}>Google authentication</button></div>
        </div>
      
    );
};

export default Login;