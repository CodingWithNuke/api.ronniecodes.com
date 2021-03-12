const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

exports.send = async (req, res, next) => {
  if (!req.body.name) {
    res.status(411);
    return next(new Error('Name is required.'))
  }
  if (!req.body.email) {
    res.status(411);
    return next(new Error('Email is required.'))
  }
  if (!req.body.subject) {
    res.status(411);
    return next(new Error('Subject is required.'))
  }
  if (!req.body.body) {
    res.status(411);
    return next(new Error('Body is required.'))
  }

  try {
    await transporter.sendMail({
      from: `'${req.body.name}' <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `RonnieCodes.com Contact Form: ${req.body.subject}`,
      text: `
      <b>Email</b>: ${req.body.email}

      ${req.body.body}
      `
    })

    return res.json({
      message: 'Your message has been sent.'
    })
  } catch (error) {
    console.log(error);
    return next(new Error('An error occurred whilst trying to send your message.'))
  }
}