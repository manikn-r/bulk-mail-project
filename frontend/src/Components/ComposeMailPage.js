import { useState } from "react";
import axios from "axios"

function ComposeMailPage(props) {
    console.log(props);
    
    const [recipient, updaterecip] = useState("");
    const [subject, updateSub] = useState("");
    const [body, updateBody] = useState("");
    const [status, updateSts] = useState(false);
    function send() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (recipient === "") {
            window.alert("Enter recipient fields to proceed");
            return ;
        }
        const mailArr = recipient.split(",");
        const isInvalidEmail = mailArr.some((x)=> !emailRegex.test(x));
        if(isInvalidEmail){
            window.alert("Invalid email format");
            return ; 
        }
        updateSts(true);
        props.isDisabled(true)
        let payload = {
            recipient: recipient,
            sub: subject,
            body: body,
            userEmail: props.userObj.email,
            userPass: props.userObj.password
        }
        let url = axios.post("https://bulk-mail-project-2-adu5.onrender.com/bulkMail", payload)
        // http://localhost:4010/bulkMail
        url.then((res) => {
            if (res.data === "success") {
                updateSts(false);
                props.isDisabled(false)
                window.alert("Email sent successfully")
            } else {
                window.alert("failed to send mail")
                updateSts(false);
                props.isDisabled(false)
            }

        }).catch((e) => {
                            window.alert("failed to send mail")
            updateSts(false);
            props.isDisabled(false)
            console.log("catch error");

        })
    }
    return (
        <>
            <div className="fields">
                <div className="field">

                    <textarea value={recipient} onChange={(e) => updaterecip(e.target.value)} placeholder="Enter Recipient Emails with comma separation Here..."></textarea>
                </div>
                <div className="field">

                    <input value={subject} onChange={(e) => updateSub(e.target.value)} type="text" placeholder="Subject Line"></input>
                </div>
                <div className="field">

                    <textarea value={body} onChange={(e) => updateBody(e.target.value)} placeholder="Enter Email Body Here..."></textarea>
                </div>

                <button onClick={send}>{status ? 'Sending Now' : 'Send Bulk Mail'}</button>
            </div>
        </>
    )

}

export default ComposeMailPage;