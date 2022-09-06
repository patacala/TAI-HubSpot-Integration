const config = require('../config/config')
const taiService = require('../services/tai.service')
const ItemService = require('../services/item.service')

const contactHook = async(req, res) => {
    try {
        
        const contact = req.body
        const payload = {
            "authenticationKey": config.INTEGRATIONS.TAI.APIKEY,
            "staffName": contact.firstname.value,
            "login": contact['portal-id'],
            "companyName": contact['associated-company'].properties.name.value
        }
        const isContactExists = await ItemService.findByHsId(contact['portal-id'])
        if(!isContactExists){
            const contactCreated = await taiService.createContact(payload)
            console.log({contactCreated})
            if(contactCreated) await ItemService.createItem('contact', contact['portal-id'], contactCreated)
        }
    } catch (error) {
        console.log(error)
    }
    return res.status(200)
}

const companyHook = async(req, res) => {
    try {
        const company = req.body;
        const payload = {
            "authenticationKey": config.INTEGRATIONS.TAI.APIKEY,
            "companyName": company.properties.name.value
        }
    
        const isCompanyExists = await ItemService.findByHsId(company.objectId)
        if(!isCompanyExists){
            const companyCreated = await taiService.createCompany(payload)
            console.log({companyCreated})
            if(companyCreated) await ItemService.createItem('company', company.objectId, companyCreated)
        }
        console.log(isCompanyExists, 'exists')
    } catch (error) {
        console.log(error)
    }
    return res.status(200)
}




module.exports = {
    contactHook,
    companyHook
}