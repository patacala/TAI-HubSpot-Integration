const { messageError, generarJWT } = require('../helpers/jwt');
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

const shipmentManager = async(req, res) => {
    const body = req.body;
    const { customer, stops } = body;
    const shipment = body;
    console.log("========================================================================",body)

    // Get organizations from TAI
    const companies = await taiService.getOrganizations();
    const myCompany = companies.find(c => c.companyName == customer.name);

    // Create and asociate elements en hubspot
    const company = await createOrUpdateCompany(customer, myCompany);
    const contact = await createOrUpdateContact(customer, myCompany, company.id);
    const deal = await createOrUpdateShipment(shipment, stops, customer, company.id);
    
    if(deal) {
        await associateDealAndContact({dealId: deal.id, contactId: contact.id });
    }

    return res.json({
        ok: "sdfsdf"
    });
}

const createOrUpdateShipment= async (shipment, stops, customer, companyId) => {
    const dealPayload = {
        [shipmentMapping.name]: `${shipment.shipmentId}`,
        [shipmentMapping.originZipCode]: stops[0].zipCode,
        [shipmentMapping.destinationZipCode]: stops[1].zipCode,
        [shipmentMapping.shipmentType]: shipment.shipmentType,
        [shipmentMapping.status]: shipmentDealMapping[shipment.status],
        [shipmentMapping.totalSell]: shipment.totalSell,
        [shipmentMapping.totalBuy]:shipment.totalBuy,
        [shipmentMapping.owner]: shipment.customer.salesRepNames || '',
        [shipmentMapping.pipeline]: pipeline.shipments,
        "shipment_id":`${shipment.shipmentId}`
        // [shipmentMapping.paymentStatus]: "payment_status",
        // [shipmentMapping.invoiceDueDate]: "invoice_due_date",
    }

    let deal = null;
    const isDealExists = await itemService.findById(shipment.shipmentId);
    if (isDealExists) {
        // const updatedShipment = await taiService.getShipmentById(shipment.shipmentId);
        // const payloadUpdated = {
        //     [shipmentMapping.name]: `${updatedShipment.shipmentId}`,
        //     [shipmentMapping.shipmentId]: `${updatedShipment.shipmentId}`,
        //     [shipmentMapping.originZipCode]: updatedShipment.stops[0].zipCode,
        //     [shipmentMapping.destinationZipCode]: updatedShipment.stops[1].zipCode,
        //     [shipmentMapping.shipmentType]: updatedShipment.shipmentType,
        //     [shipmentMapping.status]: shipmentDealMapping['Paid'],
        //     [shipmentMapping.totalSell]: updatedShipment.totalSell,
        //     [shipmentMapping.totalBuy]: updatedShipment.totalBuy,
        //     [shipmentMapping.owner]: getOwner(customer.staffID),
        //     [shipmentMapping.pipeline]: pipeline.shipments,
        //     // [shipmentMapping.paymentStatus]: "payment_status",
        //     // [shipmentMapping.invoiceDueDate]: "invoice_due_date",
        // }
        contact = await updateDeal(dealPayload, isDealExists.hsId);
    } else {
        try {
            
            deal = await createDeal(dealPayload);
            if(deal) {
                await itemService.createItem('deal', deal.id, shipment.shipmentId)
                await associateDealAndCompany({dealId: deal.id, companyId });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return deal;
}


const createOrUpdateContact = async (customer, myCompany, companyId) => {
    const contactPayload = {
        [contactMapping.staffName]: customer.staffName,
        [contactMapping.staffID]: customer.staffID,
        [contactMapping.staffPhone]: myCompany.phone,
    }
    let contact = null;
    const isContactExists = await itemService.findById(customer.staffID)
    if (isContactExists) {
        contact = await updateContact(contactPayload, isContactExists.hsId);
    } else {
        contact = await createContact(contactPayload);
        if(contact) {
            await associateContactAndCompany({contactId: contact.id, companyId });
            await itemService.createItem('contact', contact.id, customer.staffID)
        }
    }
    return contact;
}

const createOrUpdateCompany = async (customer, myCompany) => {
    const companyPayload = {
        [companyMapping.companyName]: customer.name,
        [companyMapping.phone]: myCompany.phone,
        [companyMapping.officeOrganizationId]: customer.billToOrganizationId,
        // [companyMapping.staffID]: getOwner(customer.staffID),
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
    let company = null;
    const isCompanyExists = await itemService.findById(customer.billToOrganizationId)
    if (isCompanyExists) {
        company = await updateCompany(companyPayload, isCompanyExists.hsId);
    } else {
        company = await createCompany(companyPayload);
        if(company) await itemService.createItem('company', company.id, customer.billToOrganizationId)
        
    }
    return company;
}


const getOwner = (ownerID) => { 
    const owner = managersMapping.find(o => o.tms === ownerID);
    return owner.hubspot || managersMapping[0].hubspot
}


module.exports = {
    shipmentManager
}