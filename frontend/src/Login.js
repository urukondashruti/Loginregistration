import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import Validation from "./LoginValidation";
import axios from "axios";

function Login(){
    const [values,setValues] =useState({
       email:"",
       password:""
    })

    const navigate = useNavigate();

    const [errors,setErrors] = useState({
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
        axios.post("http://localhost:8082/login",values)
        .then(res => {
            if(res.data === "success"){
                navigate("/home");
            }
            else{
                alert("No record existed");
            }
        })
        .catch(err => console.log(err));
     }
   }


    return(
        <div>
            <div>
                <form action="" onSubmit={SubmitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={handleInput} value={values.email} name="email" placeholder="Enter Email"/>
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input type="password" onChange={handleInput} value={values.password} name="password" placeholder="Enter Email"/>
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit">Login</button>
                    <Link to="/signup">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login