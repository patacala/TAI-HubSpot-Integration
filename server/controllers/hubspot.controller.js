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
    updateDeal,
    deleteCompanyById
} = require('../services/hubspot.service');

const itemService = require("../services/item.service");

const shipmentManager = async(req, res) => {
    const body = req.body;
    const { customer, stops } = body;
    const shipment = body;

    // Get organizations from TAI
    const companies = await taiService.getOrganizations();
    const myCompany = companies.find(c => c.companyName == customer.name);
    
    // Create and asociate elements en hubspot
    const company = await createOrUpdateCompany(customer, myCompany);
    if(company) {
        const contact = await createOrUpdateContact(customer, myCompany, company.id);
        const deal = await createOrUpdateShipment(shipment, stops, customer, company.id);

        if(deal) {
            await associateDealAndContact({dealId: deal.id, contactId: contact.id });
        }
    }
    

    return res.status(200).json();
}

const createOrUpdateShipment= async (shipment, stops, customer, companyId) => {
    const getShipmentReferenceNumbers = (referenceType) => shipment.shipmentReferenceNumbers.find(ship => ship.referenceType === referenceType);
    const estimatedPickUpDate = shipment.stops[0].estimatedReadyDateTime ? 
        { [shipmentMapping.estimatedPickUpDate]: new Date(shipment.stops[0].estimatedReadyDateTime.split('T')[0]).getTime() } : 
        {};
    const actualPickUpDate = shipment.stops[0].actualArrivalDateTime ? 
        { [shipmentMapping.actualPickUpDate]: new Date(shipment.stops[0].actualArrivalDateTime.split('T')[0]).getTime() } : 
        {};

    const existReferenceNumber = getShipmentReferenceNumbers('Custom Reference Number') 
    const customReferenceNumber = existReferenceNumber ? 
        { [shipmentMapping.customReferenceNumber] : existReferenceNumber.value } : {};
    
    const existReferenceNumber2 = getShipmentReferenceNumbers('Custom Reference Number 2') 
    const customReferenceNumber2 = existReferenceNumber2 ? 
        { [shipmentMapping.customReferenceNumber2] : existReferenceNumber2.value} : {};

    try {
        
        const dealPayload = {
            [shipmentMapping.name]: `${shipment.shipmentId}`,
            [shipmentMapping.originZipCode]: stops[0].zipCode,
            [shipmentMapping.destinationZipCode]: stops[1].zipCode,
            [shipmentMapping.shipmentType]: shipment.shipmentType,
            [shipmentMapping.status]: shipmentDealMapping[shipment.status],
            [shipmentMapping.totalSell]: shipment.totalSell,
            [shipmentMapping.totalBuy]:shipment.totalBuy,
            [shipmentMapping.pipeline]: pipeline.shipments,
            [shipmentMapping.shipmentId]:`${shipment.shipmentId}`,
            [shipmentMapping.owner]: shipment.customer.salesRepNames || '',
            ...customReferenceNumber,
            ...customReferenceNumber2,
            ...estimatedPickUpDate,
            ...actualPickUpDate,
        }
        let deal = null;
        const isDealExists = await itemService.findById(shipment.shipmentId);
        // console.log(isDealExists)
        if (isDealExists) {
            const updatedShipment = await taiService.getShipmentById(shipment.shipmentId);
            const payloadUpdated = {
                [shipmentMapping.name]: `${updatedShipment.shipmentId}`,
                [shipmentMapping.shipmentId]: `${updatedShipment.shipmentId}`,
                [shipmentMapping.originZipCode]: updatedShipment.stops[0].zipCode,
                [shipmentMapping.destinationZipCode]: updatedShipment.stops[1].zipCode,
                [shipmentMapping.shipmentType]: updatedShipment.shipmentType,
                [shipmentMapping.status]: shipmentDealMapping[updatedShipment.status],
                [shipmentMapping.totalSell]: updatedShipment.totalSell,
                [shipmentMapping.totalBuy]: updatedShipment.totalBuy,
                [shipmentMapping.pipeline]: pipeline.shipments,
                [shipmentMapping.owner]: shipment.customer.salesRepNames || '',
                ...customReferenceNumber,
                ...customReferenceNumber2,
                ...estimatedPickUpDate,
                ...actualPickUpDate,
            }
            contact = await updateDeal(payloadUpdated, isDealExists.hsId);
        } else {            
            deal = await createDeal(dealPayload);
            if(deal) {
                await itemService.createItem('deal', deal.id, shipment.shipmentId)
                await associateDealAndCompany({dealId: deal.id, companyId });
            }
        }
    
        return deal;
    } catch (error) {
        console.log(error)
    }
}


const createOrUpdateContact = async (customer, myCompany, companyId) => {
    try {
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
                try {
                    await associateContactAndCompany({contactId: contact.id, companyId });
                    await itemService.createItem('contact', contact.id, customer.staffID)
                } catch (error) {
                    // Contact already exist in db 
                    await deleteContact(contact.id)
                }
            }
        }
        return contact;
        
    } catch (error) {
        console.log(error)
    }
}

const createOrUpdateCompany = async (customer, myCompany) => {
    try {
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
            'tms_companyid': customer.billToOrganizationId
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
            if(company) {
                    await itemService.createItem('company', company.id, customer.billToOrganizationId)
            }       
        }
        return company;
        
    } catch (error) {
        console.log(error)
    }
}


const getOwner = (ownerID) => { 
    const owner = managersMapping.find(o => o.tms === ownerID);
    return owner.hubspot || managersMapping[0].hubspot
}


module.exports = {
    shipmentManager
}