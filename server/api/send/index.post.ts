import nodemailer from "nodemailer"

export default defineEventHandler(async (event) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  const mailmessage = {
    from: "example@aaa.com",
    to: process.env.EMAIL,
    subject: ".env変更しました",
    text: "送信のテストメールです",
  }

  await transporter.sendMail(mailmessage, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
})
