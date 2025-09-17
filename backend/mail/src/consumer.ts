import ampq from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const startSendOtpConsumer = async()=>{
    try {
        const connection = await ampq.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
        });

        const channel = await connection.createChannel();

        const queueName = "Send-otp"

        await channel.assertQueue(queueName, {durable:true});

        console.log("✅ Mail Service consumer started, listening for otp emails" );

        channel.consume(queueName, async(msg)=>{
            if (msg) {
                try {
                    const {to, subject, body} = JSON.parse(msg.content.toString());

                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth:{
                            user: process.env.USER,
                            pass: process.env.PASSWORD,
                        },
                    });
                    await transporter.sendMail({
                        from: "ChartApp",
                        to,
                        subject,
                        text: body,
                    });
                    console.log(`OTP Mail Sent to ${to}`);
                    channel.ack(msg)
                } catch (error) {
                    console.log("Failed to send OTP.", error);
                }
            }
        })
    } catch (error) {
        console.log("Failed to Start rabbitmq consumer", error);
    }
}