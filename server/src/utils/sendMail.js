import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD
  }
})

const sendMail = async (email, subject, otp) => {
  const html = `This is your OTP : ${otp}`
  console.log(otp);

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html
  })
}

const sendResetMail = async (email, subject, data) => {
  const html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Reset Your Password</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f3f3f3;
                      margin: 0;
                      padding: 0;
                    }
                    .container {
                      background-color: #ffffff;
                      padding: 20px;
                      margin: 20px auto;
                      border-radius: 8px;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      max-width: 600px;
                    }
                    h1 {
                      color: #5a2d82;
                    }
                    p {
                      color: #666666;
                    }
                    .button {
                      display: inline-block;
                      padding: 15px 25px;
                      margin: 20px 0;
                      background-color: #5a2d82;
                      color: white;
                      text-decoration: none;
                      border-radius: 4px;
                      font-size: 16px;
                    }
                    .footer {
                      margin-top: 20px;
                      color: #999999;
                      text-align: center;
                    }
                    .footer a {
                      color: #5a2d82;
                      text-decoration: none;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>Reset Your Password</h1>
                    <p>Hello,</p>
                    <p>You have requested to reset your password. Please click the button below to reset your password.</p>
                    <a href="${process.env.frontend_url}reset-password/${data.token}" class="button">Reset Password</a>
                    <p>If you did not request this, please ignore this email.</p>
                    <div class="footer">
                      <p>Thank you,<br>Your Website Team</p>
                      <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
                    </div>
                  </div>
                </body>
                </html>`;
  console.log(`${process.env.frontend_url}/reset-password/${data.token}`)
  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html
  })
}


export { sendMail, 
  sendResetMail 
};
