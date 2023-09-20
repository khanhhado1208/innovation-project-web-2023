import React from 'react';
//import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import NavBar from "../public/NavBar";
//import { signOut } from "firebase/auth";
import Hoistone from '../components/Hoistone'

import Sidebar from '../components/Sidebar';


const Dashboard = () => {
   
    const user = auth.currentUser;

    return(
        
          <div className = "container">

<NavBar />

<div className = "row justify-content-center">
   <div className = "col-md-4 text-center">
  
   <p className = "lead">Welcome to Konecranes Crane Portal!</p>
       <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. Follow the dashboard to track and monitor your hoists with ease. We're here to make your hosting operations more efficient and convinient.</p>
       <Sidebar />
    <div className = "d-grid gap-2">
          <Hoistone />

       </div>                
   </div>
</div>
</div>

       
      
    )    
}

export default Dashboard