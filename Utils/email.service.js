const nodemailer = require("nodemailer")

function emailSenderService (email, randomCode){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.VERIFIER_EMAIL,
            pass: process.env.GOOGLE_PASS
        }
    })
    
    
    const emailOptions = {
        from: process.env.VERIFIER_EMAIL,
        to: email,
        subject: "Email verifying",
        html: `<b> Email tasdiqlash kodingiz: ${randomCode}`
    }
    
    transporter.sendMail(emailOptions,(error, info)=> {
        if (error) {
            console.log(error);
            
        }
        if (info) {
            console.log(info.messageId);
            
        }
    } )
}

module.exports = emailSenderService