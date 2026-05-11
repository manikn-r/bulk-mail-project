import {useEffect, useState} from "react";
// import { UserContext } from '../Context.js'; // Import the context
function Quicklinks(props){
    console.log(props.renderSelLink);
    let quicklinks=[
           {
        linkId:"logIn",
        linkName:"LogIn"
    },
        {
        linkId:"composeEmail",
        linkName:"Compose Mail"
    },
       {
        linkId:"sentHistory",
        linkName:"Sent History"
    }
]
//   const {selectedLink} = useContext(UserContext);
  useEffect( ()=>{
setSelectedLink(props.selectedAppLink)
  },[props.selectedAppLink])
const [selectedLink, setSelectedLink] = useState("logIn");
function linksel(link){
props.renderSelLink(link.linkName);
setSelectedLink(link.linkId);
}
    return(
    <>
{
    quicklinks.map((link)=>{
        return(
            // disableLink
            <p key={link.linkId} className={`link ${ ((link.linkId === 'sentHistory') || (selectedLink === 'logIn' && link.linkId !== 'logIn')) && props.disablelink ? 'disabled-link' : ''} ${link.linkName === selectedLink ? 'active-link' : ''}`} onClick={()=>linksel(link)}>{link.linkName} {link.linkId === 'sentHistory' && props.disablelink ?  <><br></br><span className="warningText">Will be enabled after mail request</span></> : ""}</p>
        )
    })
}
    </>)
}

export default Quicklinks;