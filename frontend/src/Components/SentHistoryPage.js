import { useEffect, useState } from "react";
import axios from "axios";

function SentHistoryPage(props){
    const [emailHistory, updateEmailHistory] = useState([])
    useEffect(()=>{
let url = axios.get("https://my-bulk-email-api.onrender.com"+props.userObj.email);
// http://localhost:4010/sentHistory?user=
url.then((res)=>{
console.log(res);
updateEmailHistory(res.data)

}).catch(e=>console.log(e))
    },[props.userObj.email])
return (
    <>
    <div className="table-container">
      <table className="history-table">
        
        <thead>
          <tr>
            <th>Date Sent</th>
            <th>Subject Line</th>
            <th>Recipients</th>
          </tr>
        </thead>

        <tbody>
          {emailHistory.map((item, index) => (
            <tr key={item._id || index}>
              <td>{new Date(item.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
              <td>{item.subject}</td>
              <td>{item.recipients}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    </>
)
}

export default SentHistoryPage;