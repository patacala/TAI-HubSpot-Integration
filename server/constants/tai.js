const shipmentMapping = {
  name: "dealname",
  shipmentId: "shipmentid",
  originZipCode: "origin_zip",
  destinationZipCode: "destination_zip",
  shipmentType: "type_of_service",
  status: "dealstage",
  totalSell:"amount",
  totalBuy:"total_buy",
  paymentStatus: "payment_status",
  invoiceDueDate: "invoice_due_date",
  owner: "salesrep_internal",
  pipeline: "pipeline"
};

const pipeline = {
  shipments: 7311505,
  sales: 'default'
}

const shipmentDealMapping = {
  Quoted: 21136803,
  Dispatched: 21136804,
  InTransit: 21136805,
  Delivered: 21136806,
  Complete: 32273483,
  Paid: 22267996,
  Canceled: 21136807
};

const companyMapping = {
  phone:"phone",
  companyName: "name",
  officeOrganizationId: "tms_company_id",
  staffID: "hubspot_owner_id",
  streetAddress: "address",
  city: "city",
  state: "state",
  zipCode: "zip",
  country: "country",
  creditLimit: "credit_limit",
  totalDue: "total_due",
  totalPasDue: "total_over_due",
  creditStatus: "credit_status"
};

const contactMapping = {
  staffName: "firstname",
  staffID: "tms_staff_id",
  staffPhone: "phone",
  company: "company",
  email: "email"
};

const managersMapping = [
  { name: "Manuel Dreyfus", tms: 150766, hubspot: 28555330 },
  { name: "Edgar De La Hoz", tms: 194323, hubspot: 27232030 },
  { name: "Anderson Indaburo", tms: 194324, hubspot: 28226119 },
  { name: "Daniela Osorio", tms: 205514, hubspot: 11798416 },
  { name: "Sindy Guerrero", tms: 274742, hubspot: 27232043 },
  { name: "Karen Diaz", tms: 461017, hubspot: 27232016 },
  { name: "Lina Reyes", tms: 461018, hubspot: 27231995 },
  { name: "LTL MP", tms: 489399, hubspot: 27965220 },
  { name: "Efrain Castro", tms: 532827, hubspot: 44015767 },  
  { name: "owner Test", tms: 150302, hubspot: 206551380 },  
  
];



const mockShipments =
{
  "shipmentId": 114003382,
  "latitude": 39.321412,
  "longitude": -93.227982,
  "mileage": 786.33,
  "customer": {
    "name": "WTS Demo",
    "referenceNumber": "",
    "staffID": 150302,
    "staffName": "World Transportation Demo",
    "staffReferenceNumber": null,
    "salesRepNames": "",
    "billToOrganizationId": 96763,
    "officeOrganizationId": 96498,
    "officeName": "World Transportation Services (TSM)"
  },
  "totalBuy": 500,
  "totalSell": 1200,
  "status": "Quoted",
  "carrierList": [],
  "attachments": null,
  "shipmentType": "LTL",
  "stackable": false,
  "trailerType": "Van",
  "trailerSize": "Full",
  "weightUnits": "lbs",
  "dimensionUnits": "in",
  "serviceLevel": "Normal",
  "shipmentReferenceNumbers": [
    {
      "referenceType": "Shipment Id",
      "value": "114003382"
    },
    {
      "referenceType": "Customer Confirmation",
      "value": "False"
    },
    {
      "referenceType": "Carrier Confirmation",
      "value": "False"
    }
  ],
  "stops": [
    {
      "companyName": null,
      "streetAddress": null,
      "streetAddressTwo": null,
      "city": "MIAMI",
      "state": "MO",
      "zipCode": "65344",
      "country": "USA",
      "contactName": null,
      "phone": null,
      "fax": null,
      "email": null,
      "instructions": null,
      "notes": null,
      "airportOrTerminalCode": null,
      "referenceNumber": null,
      "estimatedReadyDateTime": "2022-08-03T08:00:00-06:00",
      "estimatedCloseDateTime": "2022-08-03T16:00:00-06:00",
      "appointmentReadyDateTime": null,
      "appointmentCloseDateTime": null,
      "actualArrivalDateTime": null,
      "actualDepartureDateTime": null,
      "stopType": "First Pickup"
    },
    {
      "companyName": null,
      "streetAddress": null,
      "streetAddressTwo": null,
      "city": "ORLANDO",
      "state": "WV",
      "zipCode": "26412",
      "country": "USA",
      "contactName": null,
      "phone": null,
      "fax": null,
      "email": null,
      "instructions": null,
      "notes": null,
      "airportOrTerminalCode": null,
      "referenceNumber": null,
      "estimatedReadyDateTime": null,
      "estimatedCloseDateTime": null,
      "appointmentReadyDateTime": null,
      "appointmentCloseDateTime": null,
      "actualArrivalDateTime": null,
      "actualDepartureDateTime": null,
      "stopType": "Last Drop"
    }
  ],
  "commodities": [
    {
      "handlingQuantity": 1,
      "packagingType": "Pallet",
      "length": null,
      "width": null,
      "height": null,
      "weightTotal": 200,
      "hazardousMaterial": false,
      "piecesTotal": 1,
      "freightClass": "50",
      "nmfc": null,
      "description": "first shipment",
      "additionalMarkings": null,
      "unNumber": null,
      "packingGroup": null,
      "referenceNumber": null,
      "hazmatCustomClassDescription": null,
      "hazmatPieceDescription": null,
      "harmonizedCode": null,
      "hazardClasses": []
    }
  ],
  "accessorialCodes": [],
  "shipmentAlerts": [],
  "driverCellPhoneNumber": null,
  "hazmatEmergencyContactNumber": null
}

module.exports = Object.freeze({
  mockShipments,
  contactMapping,
  managersMapping,
  companyMapping,
  shipmentDealMapping,
  shipmentMapping,
  pipeline
})