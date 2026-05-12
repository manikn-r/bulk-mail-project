import { useState,useContext } from "react";
import { UserContext } from '../Context.js'; // Import the context
function Login(probs){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setSelectedLink} = useContext(UserContext);
  // 2. The function that runs when they click "Login"

  const handleLogin = (e) => {
    e.preventDefault(); // Stops the page from refreshing
probs.setEmail(email)
probs.setPass(password)
if(email === 'admin' && password === "1234"){
  probs.isDisabled(false)
  setSelectedLink("Compose Mail")
  probs.renderSelLink("Compose Mail");

}else{
  window.alert("Invalid credentials");
  return;
}

  };
    return (<>
<div className="log-in-container">
    <form onSubmit={handleLogin}>
          
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>App Password</label>
            <input 
              type="password" 
              placeholder="16-digit Nodemailer password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          
        </form>
</div>
</>
    )
}

export default Login;