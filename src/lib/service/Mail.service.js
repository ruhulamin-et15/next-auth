import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const SendEmail = async (name, token, email) => {
  const info = await transporter.sendMail({
    from: "ruhulamin.et15@gmail.com",
    to: email,
    subject: "Forget Password", // Subject line

    html: `Hey, ${name}
    your forget password link is below click the link <br/> 
    <a href="http://localhost:3000/auth/update-password?token=${token}">Click</a>
    `,
  });
  return info;
};
