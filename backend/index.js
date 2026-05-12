const express = require('express')
const app = express();
const cors = require("cors");
app.use(cors({ origin: 'https://your-react-app.vercel.app' })); // We will get this URL in Phase 3
app.use(express.json());
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://manikandan:1234@mani.hhwqfi4.mongodb.net/mailDB?appName=mani").then(()=>{
    console.log("DB connected");
    
}).catch((e)=>{
    console.log("DB not connected "+e);
    
})
const model = mongoose.model("model", {
    senderEmail: String,
    date: Date,
    subject: String,
    recipients: String
}, "bulkEmailPro")

app.get("/sentHistory",(req,res)=>{
    model.find({senderEmail: req.query.user}).then( (data)=>{
        res.send(data);
    })
})
app.post("/bulkMail",(req,res)=>{
    let reqBody = req.body;
    console.log(reqBody);
    console.log(model.find().then( (res)=>{
        console.log(res);
        
    }));
    
    
    let toMailArr = reqBody.recipient.split(",")
    const transport = nodemailer.createTransport({
         service:"gmail",
    auth:{
        user:reqBody.userEmail,
        pass:reqBody.userPass
    }
    })
    new Promise(async function(resolve, reject){

    try{
        for(let mail of toMailArr){
        
            const mailOptions={
                from: reqBody.userEmail,
                to:mail,
                subject:reqBody.sub,
                text: reqBody.body
            }
            await transport.sendMail(mailOptions) 
            console.log("mail send to "+ mail);
            
        }
        // res.send("success")
            model.create({
                senderEmail: reqBody.userEmail,
                date:new Date(),
                subject:reqBody.sub,
                recipients:reqBody.recipient
            })
        resolve("success")
        console.log('out of for loop');
    }
    catch(error){
        reject("failed")
console.log("catch error details:", error.message);
        
    }
}).then(()=>{
    res.send("success")
}).catch(()=>{
    res.send("failed")
})
})
