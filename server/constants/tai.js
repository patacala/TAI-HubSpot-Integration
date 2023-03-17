const shipmentMapping = {
  name: "dealname",
  shipmentId: "shipment_id",
  originZipCode: "origin_zip",
  destinationZipCode: "destination_zip",
  shipmentType: "type_of_service",
  status: "dealstage",
  totalSell:"amount",
  totalBuy:"total_buy",
  paymentStatus: "payment_status",
  invoiceDueDate: "invoice_due_date",
  owner: "salesrep_internal",
  pipeline: "pipeline",
  estimatedPickUpDate: "estimated_pickup_date",
  actualPickUpDate: "actual_pickup_date",
  customReferenceNumber: 'operator',
  customReferenceNumber2: 'customer_service_rep'
};

const pipeline = {
  shipments: 7311505,
  sales: 'default'
}

const shipmentDealMapping = {
  Quoted: 21136803,
  Quote: 21136803,
  Booked: 62364771,
  Committed: 62364771,
  Ready: 62364772,
  Sent: 62364773,
  Dispatched: 21136804,
  "In Transit": 21136805,
  "Out for Delivery": 62364774,
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
  "shipmentId": 115365409,
  "latitude": 42.212202,
  "longitude": -88.167149,
  "lastLocationUpdate": "2023-03-06T08:00:00Z",
  "mileage": 1431.25,
  "customer": {
    "name": "Hitex Marketing Group",
    "referenceNumber": null,
    "staffID": 529415,
    "staffName": "Jackie Rusca",
    "staffReferenceNumber": null,
    "salesRepNames": "Sindy Guerrero",
    "billToOrganizationId": 185694,
    "officeOrganizationId": 96498,
    "officeName": "World Transportation Services (TSM)"
  },
  "totalBuy": 519.41,
  "totalSell": 586.93,
  "status": "Dispatched",
  "carrierList": [
    {
      "name": "ABF FREIGHT SYSTEM, INC.",
      "scac": "ABFS",
      "dotNumber": "82866",
      "mcNumber": "029910",
      "trackingURL": "https://www.abfs.com/tools/trace/default.asp?hidsubmitted=y&refno0=WWW3936351",
      "city": "FORT SMITH",
      "state": "AR",
      "zipCode": "72903",
      "phoneNumber": "+18007556486",
      "tariffName": "BL - World Transportation Services (TSM) - ABFS",
      "transitType": "Linehaul",
      "status": "Dispatched",
      "buy": 519.41,
      "sell": 586.93
    }
  ],
  "attachments": [
    {
      "attachmentUrl": "https://wts.taicloud.net/Files/Attachments?i=23065172&t=0",
      "attachmentType": "Document",
      "documentId": 23065172
    }
  ],
  "shipmentType": "LTL",
  "stackable": false,
  "trailerType": "Van",
  "trailerSize": "Full",
  "weightUnits": "lbs",
  "dimensionUnits": "in",
  "serviceLevel": "Normal",
  "shipmentReferenceNumbers": [
    {
      "referenceType": "Shipper Reference Number",
      "value": "PO# 19151-1"
    },
    {
      "referenceType": "Customer PO Number",
      "value": "PO# 19151-1"
    },
    {
      "referenceType": "API Quote Number",
      "value": "LYSBWD0653"
    },
    {
      "referenceType": "Linehaul Carrier Pro Number",
      "value": "WWW3936351"
    },
    {
      "referenceType": "Custom Reference Number",
      "value": "Jessica"
    },
    {
      "referenceType": "Custom Reference Number 2",
      "value": "Axel"
    },
    {
      "referenceType": "Customer Confirmation",
      "value": "False"
    },
    {
      "referenceType": "Carrier Confirmation",
      "value": "False"
    },
    {
      "referenceType": "Linehaul",
      "value": "WWW3936351"
    },
    {
      "referenceType": "Shipment Id",
      "value": "115365409"
    }
  ],
  "stops": [
    {
      "companyName": "Howw Manufacturing",
      "streetAddress": "28W020 Commercial Ave",
      "streetAddressTwo": null,
      "city": "BARRINGTON",
      "state": "IL",
      "zipCode": "60010",
      "country": "USA",
      "contactName": "Lisa Stehno",
      "phone": "+18002234699",
      "fax": null,
      "email": "lisa@howw.com",
      "instructions": null,
      "notes": null,
      "airportOrTerminalCode": null,
      "referenceNumber": null,
      "estimatedReadyDateTime": "2023-03-07T08:00:00-06:00",
      "estimatedCloseDateTime": "2023-03-07T16:30:00-06:00",
      "appointmentReadyDateTime": null,
      "appointmentCloseDateTime": null,
      "actualArrivalDateTime": null,
      "actualDepartureDateTime": null,
      "stopType": "First Pickup"
    },
    {
      "companyName": "Hitex Marketing Group, Inc",
      "streetAddress": "1566 NW 108th Avenue",
      "streetAddressTwo": null,
      "city": "MIAMI",
      "state": "FL",
      "zipCode": "33172",
      "country": "USA",
      "contactName": "Jackie Rusca",
      "phone": "+13054061150x228",
      "fax": "+13054061139",
      "email": "jrusca@hitexmarketing.com",
      "instructions": null,
      "notes": null,
      "airportOrTerminalCode": null,
      "referenceNumber": null,
      "estimatedReadyDateTime": "2023-03-10T08:00:00-05:00",
      "estimatedCloseDateTime": "2023-03-10T16:00:00-05:00",
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
      "length": 40.0,
      "width": 50.0,
      "height": 45.0,
      "weightTotal": 183.0,
      "hazardousMaterial": false,
      "piecesTotal": 1,
      "freightClass": "250",
      "nmfc": "",
      "description": "Plastic Pitchers",
      "additionalMarkings": null,
      "unNumber": null,
      "packingGroup": null,
      "referenceNumber": null,
      "hazmatCustomClassDescription": null,
      "hazmatPieceDescription": null,
      "harmonizedCode": null,
      "hazardClasses": []
    },
    {
      "handlingQuantity": 1,
      "packagingType": "Pallet",
      "length": 40.0,
      "width": 50.0,
      "height": 66.0,
      "weightTotal": 305.0,
      "hazardousMaterial": false,
      "piecesTotal": 1,
      "freightClass": "250",
      "nmfc": "",
      "description": "Plastic Pitchers",
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