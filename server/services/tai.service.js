const config = require('../config/config')
const { get, post, put } = require('../services/http.service');


const getOrganizations = async () => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/organizations?authenticationKey=${config.INTEGRATIONS.TAI.APIKEY}`;
  return await get(url);
}

const getShipmentById = async (shipmentId) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/shipping/v2/getShipmentDetails/${shipmentId}/${config.INTEGRATIONS.TAI.APIKEY}`;
  console.log({url})
  return await get(url);
}

const createContant = async (payload) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/shipping/v2/getShipmentDetails/${shipmentId}/${config.INTEGRATIONS.TAI.APIKEY}`;
  // return await put(url);
}

const createCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/customerCreation`;
  // console.log({url})
  // return await post(url, payload);
}

module.exports = {
  getOrganizations,
  getShipmentById,
  createContant,
  createCompany
}