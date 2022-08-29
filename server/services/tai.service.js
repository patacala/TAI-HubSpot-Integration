const config = require('../config/config')
const { get, post, put } = require('../services/http.service');


const getOrganizations = async () => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/organizations?authenticationKey=${config.INTEGRATIONS.TAI.APIKEY}`;
  return await get(url, {}, {'x-api-key': config.INTEGRATIONS.TAI.APIKEY});
}

const getShipmentById = async (shipmentId) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/shipping/v2/getShipmentDetails/${shipmentId}/${config.INTEGRATIONS.TAI.APIKEY}`;
  console.log({url})
  return await get(url, {}, {'x-api-key': config.INTEGRATIONS.TAI.APIKEY});
}

const createContant = async (payload) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/customerStaffCreation}`;
  return await put(url, payload);
}

const createCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/customerCreation`;
  // console.log({url})
  return await post(url, payload);
}

module.exports = {
  getOrganizations,
  getShipmentById,
  createContant,
  createCompany
}