import React, { useState } from "react";
import { Box, Typography, TextField, Checkbox, Switch } from "@mui/material";
import { useContactStore } from "../store/useContactStore";
import {
  useContacts,
  useUpdateContact,
  useDeleteContact,
} from "../hooks/useContacts";
import ContactList from "../components/contactList";
import ContactForm from "../components/contactForm";
import { useSnackbar } from "notistack";

export default function HomePage() {
  const {
    searchInput,
    setSearchInput,
    showFavouritesOnly,
    setShowFavouritesOnly,
  } = useContactStore();
  const { data, isLoading } = useContacts(1, searchInput); // Added refetch
  const contacts = data?.data || [];
  // const addContactMutation = useAddContact();
  const updateContactMutation = useUpdateContact();
  const deleteContactMutation = useDeleteContact();
  const { enqueueSnackbar } = useSnackbar();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const filteredContacts = showFavouritesOnly
    ? contacts.filter(
        (c) =>
          c.favourite &&
          c.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : contacts.filter((c) =>
        c.name.toLowerCase().includes(searchInput.toLowerCase())
      );

  const handleEdit = (contact) => {
    setCurrentUser(contact);
    setIsFormOpen(true);
  };

  const handleDelete = (contactId) => {
    deleteContactMutation.mutate(contactId, {
      onSuccess: () =>
        enqueueSnackbar("Contact deleted successfully!", {
          variant: "success",
        }),
      // onError: (error) => enqueueSnackbar("Failed to delete contact", { variant: "error" }),
    });
  };

  const handleToggleFavorite = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      const updatedContact = { ...contact, favourite: !contact.favourite };
      updateContactMutation.mutate(updatedContact, {
        onSuccess: () =>
          enqueueSnackbar("Favorite status updated successfully!", {
            variant: "success",
          }),
        // onError: (error) => enqueueSnackbar("Failed to update favorite status", { variant: "error" }),
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffff",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          border: "2px solid #000",
          borderRadius: "10px",
          p: 2,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "#333", textAlign: "center" }}
        >
          Contact List
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}
        >
          <TextField
            label="Search contact"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
            sx={{ mr: 1 }}
          />
          <Switch
            checked={showFavouritesOnly}
            onChange={(e) => setShowFavouritesOnly(e.target.checked)}
            inputProps={{ "aria-label": "Show favourites only" }}
          />
          <Typography sx={{ ml: 1 }}>Show Favourites</Typography>
        </Box>

        {isLoading ? (
          <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
        ) : filteredContacts.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>
            No contacts found
          </Typography>
        ) : (
          <ContactList
            contacts={filteredContacts}
            onUpdateContact={handleEdit}
            onDeleteContact={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <ContactForm
          currentUser={currentUser}
          open={isFormOpen}
          setOpen={setIsFormOpen}
          onAddSuccess={() =>
            enqueueSnackbar("Contact added successfully!", {
              variant: "success",
            })
          }
          onUpdateSuccess={() =>
            enqueueSnackbar("Contact updated successfully!", {
              variant: "success",
            })
          }
        />
      </Box>
    </Box>
  );
}
