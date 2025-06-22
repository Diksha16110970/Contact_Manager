import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../api/contactApi";

// useContacts.js
export const useContacts = (search) => {
  return useQuery({
    queryKey: ["contacts", search],
    queryFn: () => fetchContacts({ search }), // fetches all
    keepPreviousData: true,
  });
};


export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContact, // Fixed to use updateContact
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};