import './App.css'
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

function App() {
  
  const [authInfo , setAuthInfo] = useState(null);

  const handleClick = () =>{
    googleLogout();
    setAuthInfo(null);
    console.log("User logged out");
  }

  useEffect(()=>{
    const storedUser = localStorage.getItem("User");
    console.log("Stored User",storedUser);
    if(storedUser){
      setAuthInfo(JSON.parse(storedUser));
    }
  },[])


  useEffect(()=>{
    if(authInfo){
      localStorage.setItem("User",JSON.stringify(authInfo));
    }
    else{
      localStorage.removeItem("User");
    }
  },[authInfo]);

  
  return (
    <>
      {
        !authInfo ? (
          <GoogleLogin
            onSuccess={(response) => {
              const userInfo = jwtDecode(response.credential); 
              setAuthInfo(userInfo);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        ) : (
          <div>
            <h3>Welcome, {authInfo.name}</h3>
            <img src={authInfo.picture} 
            alt="User Profile Picture"
            referrerPolicy="no-referrer"/>
            {/* 
              image was not showing but i when i was copying drc from inspecting it and directly pasing it in url then it was showing image 
              then i added referrerPolicy 
              because it was CORS Restriction 
              it means that
              Google might be blocking cross-origin image loading.
            */}
          <button 
            onClick={()=>handleClick()}
          >
            Log Out
          </button>
        </div>
        )
      }   
    </>
  )
}

export default App

{/* <img alt src="https://lh3.googleusercontent.com/a/ACg8ocL8CiUVzDV5b_74DnAxtrDqfn7wqIAhnTosaWSm27HFVB77NOPw=s96-c"> */}