const express = require('express')
const app = express();
const cors = require("cors");
const { Resend } = require('resend');

// 1. Initialize CORS so Vercel can talk to Render
app.use(cors({
    origin: "*", // Allows any frontend to connect. Change to your Vercel URL later for strict security.
    methods: ["GET", "POST"]
}));
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
    model.find().then( (data)=>{
        res.send(data);
    }).catch( (e)=>{
        res.send("from catch "+e)
    })
})
app.post("/bulkMail",(req,res)=>{
    let reqBody = req.body;
    console.log(reqBody);
    console.log(model.find().then( (res)=>{
        console.log(res);
        
    }));
    
    // Initialize Resend with your secret key
        const resend = new Resend(process.env.RESEND_API_KEY);
                let toMailArr = reqBody.recipient.split(",")
    new Promise(async function(resolve, reject){

    try{
        // for(let mail of toMailArr){
        
        //     const mailOptions={
        //         from: "manikandan.ramachandran01@gmail.com",
        //         to:mail,
        //         subject:reqBody.sub,
        //         text: reqBody.body
        //     }
        //     await transport.sendMail(mailOptions) 
        //     console.log("mail send to "+ mail);
            
        // }
        for (let mail of toMailArr) {
            // Send the email via Resend's API
            const { data, error } = await resend.emails.send({
                // NOTE: If you don't have a verified domain, this MUST be 'onboarding@resend.dev'
                from: 'manikandan.ramachandran01@gmail.com', 
                to: mail.trim(),
                subject: reqBody.sub,
                text: reqBody.body
            });

            if (error) {
                console.error("Resend failed for", mail, error);
            } else {
                console.log("Mail sent to", mail, "ID:", data.id);
            }
        }
        // res.send("success")
            model.create({
                senderEmail: "manikandan.ramachandran01@gmail.com",
                date:new Date(),
                subject:reqBody.sub,
                recipients:reqBody.recipient
            })
        resolve("success")
        console.log('out of for loop');
    }
    catch(error){
        reject(error)
console.log("catch error details:", error.message);
        
    }
}).then(()=>{
    res.send("success")
}).catch((e)=>{
    res.send("from catch2 " + e)
})
})
