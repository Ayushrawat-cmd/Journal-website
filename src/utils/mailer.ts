import nodemailer from "nodemailer";
import User from "@/model/User";
import bcryptjs from "bcryptjs";

type Email = {
  email: string;
  emailType: string;
  userId: string;
};
export const sendEmail = async ({ email, emailType, userId }: Email) => {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);
    const userData = await User.findById(userId);
    let subject, body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ayushrawat324@gmail.com",
        // api_key:'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'
        pass: "zvxuqkfskstfoexl",
      },
    });
    if (emailType === "VERIFY") {
      body = `<p>Click <a href="${process.env.DOMAIN}/verifyemail/?token=${hashedToken}">here</a> to Verify your email</p>`;
      subject = "Verify your email";
      userData.verifyToken = hashedToken;
      userData.verifyTokenExpiry = Date.now() + 3600000;
      await userData.save();
    } else if (emailType === "RESET") {
      subject = "Reset your password";
      body = `<p>Click <a href="${process.env.DOMAIN}/resetpassword/?token=${hashedToken}">here</a> to Reset your password</p>`;
      userData.forgotPasswordToken = hashedToken;
      userData.forgotPasswordTokenExpiry = Date.now() + 3600000;
      await userData.save();
    } else if (emailType === "SUBMISSION") {
      body = `<p>Your paper is successfully submitted. Click <a href="${process.env.DOMAIN}/dashboard">here</a> to go to your dashboard </p>`;
      subject = "Successfully Submitted";
      await transporter.sendMail({
        from: "ayushrawat324@gmail.com",
        to: "ayushrawat324@gmail.com",
        subject: "Paper for reviewing",
        html: "Paper",
      });
    }
    const mailres = await transporter.sendMail({
      from: "ayushrawat324@gmail.com",
      to: email,
      subject: subject,
      html: body,
    });
    return mailres;
  } catch (error) {
    throw new Error("NOt sent");
  }
};
