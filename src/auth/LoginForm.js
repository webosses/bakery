import React,{useState} from 'react'

function LoginForm({login}) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("")
    return (
        <div className="login">
        <div className="login_form">
         <div className="login_header"> <h2>User Login</h2></div>
         <div className="input">
             <label>Username</label>
             <input type="text" value={username} onChange={e=>setUsername(e.target.value)}/>
         </div>
         <div className="input">
             <label>password</label>
             <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
         </div>
         <div className="login_btn"><button onClick={()=>login(username,password)}>Submit</button></div>
            
        </div>
        </div>
    )
}

export default LoginForm
