import React from "react";
import { Box, Typography, TextField, Checkbox, Button } from "@mui/material";
import { useContactStore } from "../store/useContactStore";
import { useContacts } from "../hooks/useContacts";
import ContactList from "../components/contactList"; // ✅ Correct import

export default function HomePage() {
  const { searchInput, setSearchInput, showFavouritesOnly, setShowFavouritesOnly } = useContactStore();
  const { data, isLoading } = useContacts();
  const contacts = data?.data || [];

  const filteredContacts = showFavouritesOnly
    ? contacts.filter(
        (c) =>
          c.favourite &&
          c.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : contacts.filter((c) =>
        c.name.toLowerCase().includes(searchInput.toLowerCase())
      );

  // Stub functions if edit/delete/favorite aren't needed yet
  const handleEdit = (contact) => {
    console.log("Edit:", contact);
  };

  const handleDelete = (contactId) => {
    console.log("Delete:", contactId);
  };

  const handleToggleFavorite = (contactId) => {
    console.log("Toggle Favorite:", contactId);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f4ff",
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
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#333", textAlign: "center" }}>
          Contact List
        </Typography>

        {/* Search and filter */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}>
          <TextField
            label="Search contact"
            variant="outlined"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
            sx={{ mr: 1 }}
          />
          <Checkbox
            checked={showFavouritesOnly}
            onChange={(e) => setShowFavouritesOnly(e.target.checked)}
          />
          <Typography>Show Favourites</Typography>
        </Box>

        {/* Contact List */}
        {isLoading ? (
          <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
        ) : filteredContacts.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>No contacts found</Typography>
        ) : (
          <ContactList
            contacts={filteredContacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <Button variant="contained" sx={{ mt: 2, backgroundColor: "#ADD8E6" }}>
          + ADD CONTACT
        </Button>
      </Box>
    </Box>
  );
}
