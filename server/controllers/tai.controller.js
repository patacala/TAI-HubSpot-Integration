const { messageError, generarJWT } = require('../helpers/jwt');
const config = require('../config/config')
const bcrypt = require('bcrypt');
const taiService = require('../services/tai.service')
const {
    contactMapping, 
    companyMapping, 
    mockShipments, 
    managersMapping, 
    shipmentDealMapping, 
    shipmentMapping, 
    pipeline
} = require("../constants/tai");

const { 
    createContact, 
    createCompany, 
    associateContactAndCompany, 
    createDeal, 
    associateDealAndCompany,
    associateDealAndContact,
    updateCompany,
    updateContact,
    updateDeal
} = require('../services/hubspot.service');

const itemService = require("../services/item.service");

const contactHook = async(req, res) => {
    const body = req.body;
    // console.log(req.body)
    const payload = {
        "authenticationKey": config.INTEGRATIONS.TAI.APIKEY,
        "staffName": "test staff",
        "login": "test23456",
        "companyName": "test hubspot"
    }
    await taiService.createContact(payload)
}

const companyHook = async(req, res) => {
    // console.log(req.body)
    const payload = {
        "authenticationKey": config.INTEGRATIONS.TAI.APIKEY,
        "companyName": "test hubspot"
    }
    // await taiService.createCompany(payload)

}




module.exports = {
    contactHook,
    companyHook
}