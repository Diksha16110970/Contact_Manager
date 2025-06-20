import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export default function ContactList({ contacts, onUpdateContact, onDeleteContact }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDetailsClick = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
    setDeleteConfirmOpen(false);
  };

  const handleEditClick = () => {
    if (onUpdateContact && selectedContact) {
      onUpdateContact(selectedContact); // This will open ContactForm in HomePage
      handleCloseDialog();
    }
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedContact && onDeleteContact) {
      onDeleteContact(selectedContact.id);
    }
    handleCloseDialog();
  };

  const handleCheckboxChange = (contactId) => {
    if (onUpdateContact) {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact) {
        onUpdateContact({
          ...contact,
          selected: !contact.selected,
        });
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {contacts.map((contact) => (
        <Box
          key={contact.id}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            p: 1,
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={contact.selected || false}
              onChange={() => handleCheckboxChange(contact.id)}
            />
            <Typography>{contact.name}</Typography>
            <Typography sx={{ ml: 1 }}>{contact.email}</Typography>
          </Box>
          <Button size="small" onClick={() => handleDetailsClick(contact)}>
            Details
          </Button>
        </Box>
      ))}

      {/* Details Dialog */}
      <Dialog open={openDialog && !deleteConfirmOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <DialogContentText>
            {selectedContact && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Contact Details
                </Typography>
                <Box>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedContact.name}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedContact.email}
                  </Typography>
                  <Typography>
                    <strong>Favourite:</strong> {selectedContact.favourite ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClick} sx={{ color: "#007bff" }}>
            Edit
          </Button>
          <Button onClick={handleDeleteClick} sx={{ color: "#dc3545" }}>
            Delete
          </Button>
          <Button onClick={handleCloseDialog} sx={{ color: "#666" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Confirm Delete
            </Typography>
            <Typography>
              Are you sure you want to delete "{selectedContact?.name}"? This action cannot be undone.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "#dc3545" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}