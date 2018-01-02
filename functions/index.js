
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = firebase-functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Orion Seguros Generales';

var today = new Date();
var yyyy = today.getFullYear().toString();

exports.sendEmail = functions.database.ref('/' ) // + yyyy + '/'
    .onWrite(event => {
    	console.log(event);
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      if (event.key.indexOf('propia') = 0) { // es autoevaluación
      	var jefe = event.data.jefe;
      	var displayName = event.key.split('_')[1];
      	var email = displayName + '@segurosorion.cl'
      	return sendEvalEmail(email, displayName, employee_email);
      }
      // console.log('Uppercasing', event.params.pushId, original);
      // const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      // return event.data.ref.parent.child('uppercase').set(uppercase);
      
    });


// notice email when self evaluation of employee sent
function selfEvalEmail(email, displayName, employee_email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Autoevaluación de ${employee}`;
  mailOptions.text = `Hola ${displayName || ''}, ${employee} envió su autoevaluación del período .
   Puedes revisar esta y todas las otras en https://evaluacion-personal.firebaseapp.com.
   - ${APP_NAME}`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New notice email sent to:', email);
  });
}
