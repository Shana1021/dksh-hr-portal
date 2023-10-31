require("dotenv").config({ path: ".env.local" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sgMailSend(to, templateId, dynamicTemplateData) {
  return sgMail.send({
    to,
    from: process.env.SENDER_EMAIL,
    templateId,
    dynamicTemplateData
  });
}

module.exports = sgMailSend;