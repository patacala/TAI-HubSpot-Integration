const config = require('../config/config')
const { get, post, put, patch} = require('../services/http.service');

// CONTACT
const createContact = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const getContactById = async(contactId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts/${contactId}?archived=false`;
  return await get(url, {}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const associateContactAndCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts/${payload.contactId}/associations/company/${payload.companyId}/1`;
  return await put(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateContact = async (payload, contactId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/contacts/${contactId}`;
  return await patch(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}


// COMPANY
const createCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/companies`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateCompany = async (payload, companyId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/companies/${companyId}`;
  return await patch(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const getCompanyById = async(companyId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/companies/${companyId}?archived=false`;
  return await get(url, {}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}



// DEALS
const associateDealAndCompany = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deal/${payload.dealId}/associations/company/${payload.companyId}/5`;
  return await put(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const associateDealAndContact = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deal/${payload.dealId}/associations/contact/${payload.contactId}/3`;
  return await put(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const createDeal = async (payload) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deals`;
  return await post(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const updateDeal = async (payload, dealId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deals/${dealId}`;
  return await patch(url, {properties: payload}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}

const getDealById = async(dealId) => {
  const url = `${config.INTEGRATIONS.HUBSPOT.URL}/deals/${dealId}?archived=false`;
  return await get(url, {}, {}, `Bearer ${config.INTEGRATIONS.HUBSPOT.APIKEY}`);
}



module.exports = {
  createContact,
  updateContact,
  createCompany,
  updateCompany,
  createDeal,
  updateDeal,
  associateContactAndCompany,
  associateDealAndCompany,
  associateDealAndContact,
  getCompanyById,
  getContactById,
  getDealById
}


