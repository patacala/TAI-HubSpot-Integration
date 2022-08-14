const { messageError, generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcrypt');
const {contactMapping, companyMapping, mockShipments, managersMapping, shipmentDealMapping, shipmentMapping, pipeline} = require("../constants/tai")
const { getOrganizations } = require('../services/tai.service')
const { createContact, createCompany, associateContactAndCompany, createDeal, associateDealAndCompany } = require('../services/hubspot.service')



const shipmentManager = async(req, res) => {
    req.body = mockShipments;
    const body = req.body;
    const { customer, stops } = body;
    const shipment = body

    const companies = await getOrganizations();
    const myCompany = companies.find(c => c.companyName == customer.name);
    
    const companyPayload = {
        [companyMapping.companyName]: customer.name,
        [companyMapping.phone]: myCompany.phone,
        [companyMapping.officeOrganizationId]: customer.officeOrganizationId,
        [companyMapping.staffID]: getOwner(customer.staffID),
        [companyMapping.streetAddress]: myCompany.streetAddress,
        [companyMapping.city]: myCompany.city,
        [companyMapping.state]: myCompany.state,
        [companyMapping.zipCode]: myCompany.zipCode,
        [companyMapping.country]: myCompany.country,
        // [companyMapping.creditLimit]: customer.staffID,
        // [companyMapping.totalDue]: customer.staffID,
        // [companyMapping.totalPasDue]: customer.staffID,
        // [companyMapping.creditStatus]: customer.staffID,
    }
    

    const companyCreated = await createCompany(companyPayload);
    console.log(companyCreated);

    const contactPayload = {
        [contactMapping.staffName]: customer.staffName,
        [contactMapping.staffPhone]: myCompany.phone,
        [contactMapping.company]: customer.name,
        // [contactMapping.email]: myCompany.referenceNumber
    }
    const contactCreated = await createContact(contactPayload);
    console.log(contactCreated);

  
    if(contactCreated) {
        await associateContactAndCompany({contactId: contactCreated.id, companyId: companyCreated.id});
    }

    const dealPayload = {
        [shipmentMapping.name]: `${shipment.shipmentId}`,
        [shipmentMapping.shipmentId]: `${shipment.shipmentId}`,
        [shipmentMapping.originZipCode]: stops[0].zipCode,
        [shipmentMapping.destinationZipCode]: stops[1].zipCode,
        [shipmentMapping.shipmentType]: shipment.shipmentType,
        [shipmentMapping.status]: shipmentDealMapping[shipment.status],
        [shipmentMapping.totalSell]: shipment.totalSell,
        [shipmentMapping.totalBuy]:shipment.totalBuy,
        [shipmentMapping.owner]: getOwner(customer.staffID),
        [shipmentMapping.pipeline]: pipeline.shipments,
        // [shipmentMapping.paymentStatus]: "payment_status",
        // [shipmentMapping.invoiceDueDate]: "invoice_due_date",
    }

    const createdDeal = await createDeal(dealPayload);
    console.log(createdDeal);

    if(createdDeal) {
        await associateDealAndCompany({dealId: createdDeal.id, companyId: companyCreated.id});
    }
    


    return res.json({
        ok: "sdfsdf"
    });
}


const getOwner = (ownerID) => { 
    const owner = managersMapping.find(o => o.tms === ownerID);
    return owner.hubspot || managersMapping[0].hubspot
}


module.exports = {
    shipmentManager
}