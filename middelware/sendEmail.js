// import nodemailer from 'nodemailer';
// import { get } from '../config'; // Import your config

// const emailConfig = get('local').email;

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: emailConfig.username,
//         pass: emailConfig.password
//     }
// });

// export const sendEmail = (from, to, subject, text) => {
//     return new Promise((resolve, reject) => {
//         const mailOptions = {
//             from: from,
//             to: to,
//             subject: subject,
//             text: text
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 reject(error); 
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 resolve(info); 
//             }
//         });
//     });
// };



const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

const sendEmail = (from, to, subject, text) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error); 
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info); 
            }
        });
    });
};

module.exports = { sendEmail };
