import nodemailer from "nodemailer";

const EmailSender = async (email, otp) => {

    try {

        // ================= TRANSPORTER =================

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: "studytimes116@gmail.com",
                pass: "idyu hfbr amng dfrw"
            }

        });

        // ================= MAIL TEMPLATE =================

        const mailOptions = {

            from: `"LibraFlow Library" <${process.env.EMAIL}>`,

            to: email,

            subject: "Your OTP Verification Code 📚",

            html: `

            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <style>

                    body{
                        margin:0;
                        padding:0;
                        background:#f4f4f4;
                        font-family:Arial,sans-serif;
                    }

                    .container{
                        width:100%;
                        padding:40px 0;
                        background:#f4f4f4;
                    }

                    .card{
                        max-width:600px;
                        background:white;
                        margin:auto;
                        border-radius:18px;
                        overflow:hidden;
                        box-shadow:0 10px 25px rgba(0,0,0,0.08);
                    }

                    .header{
                        background:linear-gradient(135deg,#7b1e3a,#a8325c);
                        padding:35px;
                        text-align:center;
                        color:white;
                    }

                    .header h1{
                        margin:0;
                        font-size:32px;
                    }

                    .content{
                        padding:40px;
                        text-align:center;
                    }

                    .content h2{
                        color:#333;
                        margin-bottom:15px;
                    }

                    .content p{
                        color:#666;
                        line-height:28px;
                        font-size:15px;
                    }

                    .otp-box{
                        margin:35px auto;
                        background:#f8e6ec;
                        color:#7b1e3a;
                        font-size:40px;
                        font-weight:bold;
                        letter-spacing:8px;
                        width:260px;
                        padding:20px;
                        border-radius:16px;
                    }

                    .warning{
                        color:#999;
                        font-size:14px;
                        margin-top:25px;
                    }

                    .footer{
                        background:#fafafa;
                        padding:25px;
                        text-align:center;
                        color:#999;
                        font-size:13px;
                    }

                    @media(max-width:600px){

                        .content{
                            padding:25px;
                        }

                        .otp-box{
                            width:100%;
                            font-size:32px;
                            letter-spacing:5px;
                        }
                    }

                </style>

            </head>

            <body>

                <div class="container">

                    <div class="card">

                        <!-- HEADER -->

                        <div class="header">

                            <h1>📚 LibraFlow</h1>

                            <p>
                                Smart Library Management System
                            </p>

                        </div>

                        <!-- CONTENT -->

                        <div class="content">

                            <h2>Email Verification</h2>

                            <p>
                                Hello Reader,
                                <br><br>
                                Use the OTP below to verify your account
                                and continue accessing the Library Management System.
                            </p>

                            <!-- OTP -->

                            <div class="otp-box">

                                ${otp}

                            </div>

                            <p>
                                This OTP will expire in
                                <strong>5 minutes</strong>.
                            </p>

                            <p class="warning">
                                Do not share this OTP with anyone.
                            </p>

                        </div>

                        <!-- FOOTER -->

                        <div class="footer">

                            © 2026 LibraFlow Library Management System
                            <br>
                            Built with ❤️ using Node.js & EJS

                        </div>

                    </div>

                </div>

            </body>

            </html>

            `
        };

        // ================= SEND EMAIL =================

        await transporter.sendMail(mailOptions);

        console.log("OTP Email Sent Successfully");

    } catch (err) {

        console.log("Email Sending Error:", err);

    }

}

export default EmailSender;

