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
  TextField,
  FormControlLabel,
} from "@mui/material";

export default function ContactList({ contacts, onUpdateContact, onDeleteContact }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    favourite: false,
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDetailsClick = (contact) => {
    setSelectedContact(contact);
    setEditForm({
      name: contact.name,
      email: contact.email,
      favourite: contact.favourite || false,
    });
    setOpenDialog(true);
    setIsEditing(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
    setIsEditing(false);
    setDeleteConfirmOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedContact && onUpdateContact) {
      const updatedContact = {
        ...selectedContact,
        name: editForm.name,
        email: editForm.email,
        favourite: editForm.favourite,
      };
      onUpdateContact(updatedContact);
    }
    setIsEditing(false);
    handleCloseDialog();
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: selectedContact.name,
      email: selectedContact.email,
      favourite: selectedContact.favourite || false,
    });
    setIsEditing(false);
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

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (contactId) => {
    if (onUpdateContact) {
      const contact = contacts.find(c => c.id === contactId);
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

      {/* Details/Edit Dialog */}
      <Dialog open={openDialog && !deleteConfirmOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <DialogContentText>
            {selectedContact && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {isEditing ? "Edit Contact" : "Contact Details"}
                </Typography>
                
                {isEditing ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      label="Name"
                      value={editForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      fullWidth
                      variant="outlined"
                      type="email"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editForm.favourite}
                          onChange={(e) => handleInputChange("favourite", e.target.checked)}
                        />
                      }
                      label="Favourite"
                    />
                  </Box>
                ) : (
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
                )}
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleCancelEdit} sx={{ color: "#666" }}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} sx={{ color: "#007bff" }}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEditClick} sx={{ color: "#007bff" }}>
                Edit
              </Button>
              <Button onClick={handleDeleteClick} sx={{ color: "#dc3545" }}>
                Delete
              </Button>
              <Button onClick={handleCloseDialog} sx={{ color: "#666" }}>
                Close
              </Button>
            </>
          )}
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