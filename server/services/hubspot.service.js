const config = require('../config/config')
const { get, post, put} = require('../services/http.service');

const createContact = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const associateContactAndCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts/${payload.contactId}/associations/company/${payload.companyId}/1 `;
  return await put(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateContact = () => {

}

const createCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/companies`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const associateDealAndCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deal/${payload.dealId}/associations/company/${payload.companyId}/5`;
  return await put(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateCompany = () => {

}

const createDeal = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deals`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateDeal = () => {

}

module.exports = {
  createContact,
  updateContact,
  createCompany,
  updateCompany,
  createDeal,
  updateDeal,
  associateContactAndCompany,
  associateDealAndCompany
}


