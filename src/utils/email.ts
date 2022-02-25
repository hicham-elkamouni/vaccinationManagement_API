import { IUser } from "@interfaces/index";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Ministry of Health",
    link: "https://vaccinationmanagement.netlify.app/",
    logo: "https://i.ibb.co/WPrnbGr/images.png",
  },
});

const appointmentMail = async (obj: IUser, date: string) => {
  const template = {
    body: {
      name: obj.fName + " " + obj.lName,
      intro: "Welcome to the coronavirus vaccination campaign portal",
      dictionary: {
        Appointment: `You can take your next dose at ${date}`
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Ministry of Health" <no-reply@gmail.com>',
    to: obj.email,
    subject: "Vaccine",
    text: "Ministry of Health",
    html: mailGenerator.generate(template),
  });
  //   return info;
};
const vaccinatedUserMail = async (obj: IUser) => {
  const template = {
    body: {
      name: obj.fName + " " + obj.lName,
      intro: "Welcome to the coronavirus vaccination campaign portal",
      dictionary: {
        Status: `Congratulations, you are now vaccinated, stay safe`
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Ministry of Health" <no-reply@gmail.com>',
    to: obj.email,
    subject: "Vaccine",
    text: "Ministry of Health",
    html: mailGenerator.generate(template),
  });

};

export { appointmentMail, vaccinatedUserMail };
