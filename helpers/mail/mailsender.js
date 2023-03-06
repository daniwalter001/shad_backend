const nodemailer = require("nodemailer")
const { getSouscriptionMailBody, getSouscriptionActivationMailBody, getPraticienAddedMailBody, getPatientAddedMailBody } = require("./mail")

let send = (to, details = {}, type = "DEMANDE_SOUSCRIPTION") => {

    // console.log({ details })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SUPPORT_EMAIL,
            pass: process.env.SUPPORT_EMAIL_PASS,
        },
    });

    let html = ""
    let subject = ""

    switch (type) {
        case "DEMANDE_SOUSCRIPTION":
            html = getSouscriptionMailBody(details)
            subject = "Demande de Souscription"
            break;

        case "VALIDATION_SOUSCRIPTION":
            html = getSouscriptionActivationMailBody(details)
            subject = "Validation de Souscription"
            break;
        case "AJOUT_PRATICIEN":
            html = getPraticienAddedMailBody(details)
            subject = "Ajout de Médécin"
            break
        case "AJOUT_PATIENT":
            html = getPatientAddedMailBody(details)
            subject = "Ajout de Patient"
            break;
        default:
            break;
    }

    let mailOptions = {
        from: ' Health+ <daniwalter001@gmail.com> ',
        // to: to || "vgapdpf@hi2.in",
        to: to || "stuff2.stuff216@gmail.com",
        subject: subject ?? `Demande de Souscription`,
        html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            // res.json(err);
            console.log({ err })
        } else {
            // res.json(info);
            console.log({ info })
        }

        return { err, info }
    });
}

module.exports = { send }