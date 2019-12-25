const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Town = db.town;

exports.findTownById = (req, res) => {
    console.log("findCityById !!!");
    Town.findByPk(req.params.id).then(town => {
        if (!town) {
            return res.status(404).send({state: false, message: "TOWN_ID_NOT_FOUND"});
        } else {
            res.status(200).json({town});
        }

    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
};

exports.listAllDistinct = (req, res) => {
    console.log("listAllShire !!!");

    const shire = req.body.shire;
    const city = req.body.city;
    const zone = req.body.zone;
    const dehestan = req.body.dehestan;
    const townName = req.body.townName;

    let query = '';

    if (shire === '*') {
        query = 'SELECT DISTINCT shire as title FROM towns';
    } else if (city === '*') {
        query = 'SELECT DISTINCT city as title FROM towns WHERE shire = :shire';
    } else if (zone === '*') {
        query = 'SELECT DISTINCT czone as title FROM towns WHERE shire = :shire and city = :city';
    } else if (dehestan === '*') {
        query = 'SELECT DISTINCT dehestan as title FROM towns WHERE shire = :shire and city = :city and czone = :zone';
    } else if (townName === '*') {
        query = 'SELECT DISTINCT townName as title FROM towns WHERE shire = :shire and city = :city and czone = :zone and dehestan = :dehestan';
    } else {
        query = 'SELECT id, shire, city, czone, dehestan, townName FROM towns WHERE shire = :shire and ' +
            'city = :city and czone = :zone and dehestan = :dehestan and townName = :townName';
    }

    db.sequelize.query(query,
        {
            replacements: {
                shire: shire,
                city: city,
                zone: zone,
                dehestan: dehestan,
                townName: townName
            }, type: Sequelize.QueryTypes.SELECT
        }
    ).then(townList => {
        if (!townList) {
            return res.status(404).send({state: false, message: "TOWN_NOT_FOUND"});
        } else {
            res.status(200).json({townList: townList});
        }
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })

};
