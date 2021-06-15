const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({ role: 'student' });
  const totalTeachers = await User.find().countDocuments({ role: 'teacher' });

  res.render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
      <li>Name:${req.body.name}</li>
      <li>Email:${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'cihangonen35@gmail.com', // gmail account
        pass: 'ticdxsokclcpcubt', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <cihangonen35@gmail.com>', // sender address
      to: 'cihangonen4k@gmail.com', // list of receivers
      subject: 'Smart EDU Contact Form New Message', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    req.flash('success', 'We Received your message successfully');

    res.status(200).redirect('contact');
  } catch (err) {
    req.flash('error', `Something happened ${err}`);
    res.status(200).redirect('contact');
  }
};
