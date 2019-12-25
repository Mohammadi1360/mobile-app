const db = require('../config/db.config.js');
const Personnel = db.personnel;

exports.findById = (req, res) => {
    Personnel.findByPk(req.params.id).then(personnel => {
        res.send(personnel);
    })
};

exports.list = (req, res) => {
    console.log("personnel List !!!");
    Personnel.findAll({
        order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC'],
        ]
    }).then(personnels => {
        res.status(200).json(personnels);
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
};

exports.insert = (req, res) => {
    console.log("Create Personnel !!!");
    Personnel.create({
        personCode: req.body.personCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        certificateNo: req.body.certificateNo,
        melliCode: req.body.melliCode,
        sex: req.body.sex,
        address: req.body.address,
        tel: req.body.tel,
        mobile: req.body.mobile,
        deptAmount: req.body.deptAmount,
        trashService: req.body.trashService,
        neighborId: req.body.neighborId,
        ownerType: req.body.ownerType,
        job: req.body.job,
        buildingDocumentNo: req.body.buildingDocumentNo
    }).then(personnel => {
        res.status(200).send({message: "PERSONNEL_REGISTERED_SUCCESSFULLY", personnel: personnel});
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Personnel.update({
            personCode: req.body.personCode,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fatherName: req.body.fatherName,
            certificateNo: req.body.certificateNo,
            melliCode: req.body.melliCode,
            sex: req.body.sex,
            address: req.body.address,
            tel: req.body.tel,
            mobile: req.body.mobile,
            deptAmount: req.body.deptAmount,
            trashService: req.body.trashService,
            neighborId: req.body.neighborId,
            ownerType: req.body.ownerType,
            job: req.body.job,
            buildingDocumentNo: req.body.buildingDocumentNo
        },
        {where: {id: id}}
    ).then(rowsUpdated => {
        if (rowsUpdated[0] !== 0) {
            res.status(200).send({message: "PERSONNEL_UPDATED_SUCCESSFULLY", id: id});
        } else {
            res.status(500).send({message: "PERSONNEL_NOT_EXISTS", id: id});
        }

    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Personnel.destroy({
        where: {id: id}
    }).then(rowDeleted => {
        if (rowDeleted !== 0) {
            res.status(200).send({message: "PERSONNEL_DELETED_SUCCESSFULLY", id: id});
        } else {
            res.status(500).send({message: "PERSONNEL_NOT_EXISTS", id: id});
        }
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

