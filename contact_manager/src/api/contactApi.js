// src/api/contactApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const fetchContacts = async ({ page = 1, limit = 10, search = '' }) => {
  const response = await axios.get(`${API_BASE}/contacts`, {
    params: { _page: page, _limit: limit, q: search },
  });
  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'], 10),
  };
};

export const addContact = (contact) =>
  axios.post(`${API_BASE}/contacts`, contact);

export const updateContact = (contact) =>
  axios.put(`${API_BASE}/contacts/${contact.id}`, contact);

export const deleteContact = (id) =>
  axios.delete(`${API_BASE}/contacts/${id}`);
