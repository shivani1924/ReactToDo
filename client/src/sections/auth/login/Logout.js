import React from "react";
import { useNavigate } from 'react-router-dom';


export default function LogOut() {
    const navigate = useNavigate();

    localStorage.removeItem("user")
    navigate('/login', { replace: true });

    
}