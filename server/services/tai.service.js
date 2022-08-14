const config = require('../config/config')
const { get, post } = require('../services/http.service');


const getOrganizations = async () => {
  const url = `${config.INTEGRATIONS.TAI.URL}/customer/organizations?authenticationKey=${config.INTEGRATIONS.TAI.APIKEY}`;
  return await get(url);
}

module.exports = {
  getOrganizations
}