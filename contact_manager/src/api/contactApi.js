// src/api/contactApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const fetchContacts = async ({ search = '' }) => {
  const response = await axios.get(`${API_BASE}/contacts`, {
    params: { q: search },
  });
  return {
    data: response.data,
    total: response.data.length, // Use data length since no x-total-count without pagination
  };
};

export const addContact = (contact) =>
  axios.post(`${API_BASE}/contacts`, contact);

export const updateContact = (contact) =>
  axios.put(`${API_BASE}/contacts/${contact.id}`, contact);

export const deleteContact = (id) =>
  axios.delete(`${API_BASE}/contacts/${id}`);
