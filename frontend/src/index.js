import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Quicklinks from "./Components/Quicklinks"
import ComposeMailPage from "./Components/ComposeMailPage"
import SentHistoryPage from './Components/SentHistoryPage';
import Login from "./Components/Login.js"
import { UserProvider } from './Context.js'; // Import it!
const root = ReactDOM.createRoot(document.getElementById('root'));


function Index() {
  const [selectedAppLink, updateAppLink] = useState("LogIn");
  const [disableLink, setSharedData] = useState(true);

    const [userEmail, updateEmail] = useState("");
  const [userPass, updatePass] = useState("");

  function handleLinkClick(linkName) {
    updateAppLink(linkName);
  }
  



  return (
    <>
    <UserProvider>

      <div className="main-container">
        <div className="quicklinks-dom">
          <Quicklinks renderSelLink = {handleLinkClick} disablelink={disableLink} selectedAppLink={selectedAppLink}/>
        </div>
        <div className="mailPages">
        {selectedAppLink === 'LogIn' && <Login renderSelLink = {handleLinkClick} setEmail={updateEmail} setPass={updatePass} isDisabled ={setSharedData}/>}
        {selectedAppLink === 'Compose Mail' && <ComposeMailPage isDisabled ={setSharedData} userObj={{ email: userEmail, password: userPass }}/>}
        {selectedAppLink === 'Sent History' && <SentHistoryPage userObj={{ email: userEmail, password: userPass }}/>}
        </div>
        {/* <p>Selected link is {selectedLink}</p> */}
      </div>
    </UserProvider>
    </>
  )
}

root.render(
  <Index></Index>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
