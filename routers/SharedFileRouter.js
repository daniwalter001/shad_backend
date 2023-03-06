const SharedFileRouter = require("express").Router();
const { checkConsultationByToken, getConsultationByToken } = require("../controllers/ConsultationController");
const { checkPatientByToken } = require("../controllers/PatientController");
const { updatePrescriptionByToken, getPrescriptionByToken, deletePrescriptionByToken, getPrescriptionsBy, addPrescription } = require("../controllers/PrescriptionController");
const { addSharedFile, updateSharedFileByToken, getSharedFileByToken, getSharedFilesBySenderOrReceiverToken, deleteSharedFileByToken } = require("../controllers/SharedFileController");
const { checkUserByToken } = require("../controllers/UserController");
const { CONSULTATION_STATUS, paths } = require("../helpers/constants");

const multer = require("multer");
const { addSharedFileValidator } = require("../validators/SharedFileValidator");

const salt = parseInt(process.env.BCRYPT_SALT);


// HANDLING UPLOAD AUTHORISATION FILES GO HERE GOES HERE ---------------

const storage_shared_file = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, paths.SHARED_FILES);
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1]

        const file_name = `${req?.body?.sender}.${req?.body?.receiver}.${Date.now()?.toString()}.${ext}`
        req["body"] = {
            ...req?.body, filename: file_name
        }

        cb(null, file_name);
    },
});
const upload_shared_file = multer({ storage: storage_shared_file });

// ------------------------------------------------

SharedFileRouter.post("/add", upload_shared_file.single("doc"), addSharedFileValidator, async (req, res, next) => {
    try {
        let sender = !(await checkUserByToken({ token: req?.body?.sender })) && !(await checkPatientByToken(req?.body?.sender))
        let receiver = !(await checkUserByToken({ token: req?.body?.receiver })) && !(await checkPatientByToken(req?.body?.receiver))

        if (!receiver || !sender) {
            let result = await addSharedFile(req.body)
            res.json({
                data: result,
                success: true,
                message: "Fichier Partagé ajouté avec succes ajouté avec succès!",
            })
            return
        }
        res.json({
            error: true,
            message: "Problème ! Erreur lors de l'ajout du fichier partagé",
        })

    } catch (error) {
        console.log(error);
        return;
    }
}).patch("/update/:token", async (req, res, next) => {
    try {
        let token = req?.params?.token ?? ""
        let file = await getSharedFileByToken(token)

        if (file) {
            let updated = await updateSharedFileByToken({
                token,
                data: req?.body
            });

            if (updated) {
                res.status(200).json({
                    success: true,
                    message: "SharedFile Mis à jour!",
                    data: updated
                });
            }

        } else {
            res.status(200).json({
                error: true,
                data: { ...req?.body, token },
                message: "Mise à jour echoué car données invalides!",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({
            error: true,
            data: err,
            message: "Operation non aboutie! Veuillez réessayer!",
        });
    }
}).get("/:token", async (req, res) => {
    try {
        console.log(req.params);
        let file = await getSharedFileByToken(req.params?.token);
        if (antecedent) {
            return res.status(200).json({
                data: file,
                success: true
            });
        } else {
            return res.status(200).json({
                data: { token: req.query?.token },
                error: true,
                message: "Aucun fichier trouvé"
            });
        }
    } catch (err) {
        return res.status(200).json({
            error: true,
            data: err
        });
    }
}).get("/all/:token", async (req, res) => {
    try {
        let _m = !(await checkUserByToken({ token: req?.params?.token })) && !(await checkPatientByToken(req?.params?.token))

        console.log({ _m })

        if (!_m) {
            let files = await getSharedFilesBySenderOrReceiverToken(req?.params?.token)
            return res.status(200).json({
                data: files,
                success: true
            });
        } else {
            return res.status(200).json({
                data: { token: req?.params?.token },
                message: "Token Invalide",
                error: true
            });
        }
    } catch (err) {
        return res.status(200).json({
            error: true,
            data: err
        });
    }
}).delete("/delete/:token", async (req, res) => {
    let token = req.params?.token
    let file = await getSharedFileByToken(token);

    if (file) {
        try {
            let _ = await deleteSharedFileByToken(token)
            if (_) {
                return res.status(200).json({
                    success: true,
                    message: "Shared file retiré"
                });
            }
        } catch (err) {
            console.log(err)
            return res.status(200).json({
                error: true,
                data: err,
                message: "Erreur lors de la suppression du fichier partagé"
            });
        }
    } else {
        return res.status(200).json({
            error: true,
            message: "Le fichier n'existe pas"
        });
    }
})

module.exports = { SharedFileRouter };