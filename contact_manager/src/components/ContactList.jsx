import React, { useState } from "react";
import { Box, Typography, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ContactList({ contacts, onEdit, onDelete, onToggleFavorite }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteClick = (contactId) => {
    setContactToDelete(contactId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (contactToDelete) {
      onDelete(contactToDelete);
    }
    setOpenDialog(false);
    setContactToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setContactToDelete(null);
  };

  return (
    <Box>
      {contacts.map((contact) => (
        <Paper
          key={contact.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            mb: 1,
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <input type="checkbox" style={{ marginRight: "8px" }} />
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>{contact.name}</Typography>
              <Typography sx={{ color: "#888", fontSize: "12px" }}>
                {contact.email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => onToggleFavorite(contact.id)} size="small" sx={{ mr: 1 }}>
              <FavoriteIcon color={contact.favourite ? "warning" : "disabled"} />
            </IconButton>
            <IconButton onClick={() => onEdit(contact)} size="small" sx={{ mr: 1 }}>
              <EditIcon sx={{ color: "#475569" }} />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(contact.id)} size="small">
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Paper>
      ))}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} sx={{ color: "#000" }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} sx={{ color: "#d32f2f" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}