import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import Validation from "./SignupValidation";
import axios from "axios";

function Signup(){
    const [values,setValues] =useState({
        name:"",
        email:"",
        password:""
     })

     const navigate = useNavigate();
 
     const [errors,setErrors] = useState({
        name:"",
        email:"",
        password:""
     })
 
     const handleInput = (event) => {
         setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
     }
 
    const SubmitForm = (e) => {
     e.preventDefault();
     setErrors(Validation(values));
     if(errors.name === "" && errors.email === "" && errors.password === ""){
        axios.post("http://localhost:8082/signup",values)
        .then(res => {
            if (res.data==="Error"){
                console.log(res);
            }
            else{
                navigate("/");
            }
            })
        .catch(err => console.log(err));
     }
    }
    
    return(
        <div>
        <div>
            <h1>Sign up</h1>
            <form action="" onSubmit={SubmitForm}>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" onChange={handleInput} value={values.name} name="name" placeholder="Enter name"/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleInput} value={values.email} name="email"  placeholder="Enter Email"/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Email</label>
                    <input type="password" onChange={handleInput}  value={values.password} name="password" placeholder="Enter Email"/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit">sign up</button>
                <Link to="/">Login</Link>
            </form>
        </div>
    </div>
    )
}

export default Signup