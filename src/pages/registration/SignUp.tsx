import React, { useState } from "react";
const SignUp : React.FC=() => {
    const [name, setName]=useState<string>("");
    const [email,setEmail]=useState<string>("");
    const[password, setPassword]=useState<string>("");
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("Name:",name);
        console.log("Email :",email);
        console.log("Password:",password);
    };
    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type =" text"
                placeholder ="Full Name"
                value ={name}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> 
                setName(e.target.value)}
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                        setEmail(e.target.value)

                    }/>
                    <input
                    type ="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                        setPassword(e.target.value)}
                    />
                    <button type ="submit">Sign Up</button>
            </form>

        </div>

    );
};
export default SignUp;
