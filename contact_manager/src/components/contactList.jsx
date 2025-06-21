import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from "@mui/material";

export default function ContactList({
  contacts,
  onUpdateContact,
  onDeleteContact,
  onToggleFavorite,
}) {
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
      onUpdateContact(selectedContact);
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
            {/* Dummy Profile Avatar */}
            <Avatar
              alt={contact.name}
              src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`}
            >
              {contact.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
              <Typography variant="subtitle1">{contact.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {contact.email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Favorite Icon */}
            <IconButton
              onClick={() => onToggleFavorite(contact.id)}
              size="small"
            >
              <FavoriteIcon
                color={contact.favourite ? "warning" : "disabled"}
              />
            </IconButton>

            {/* Details Button */}
            <Button size="small" onClick={() => handleDetailsClick(contact)}>
              Details
            </Button>
          </Box>
        </Box>
      ))}

      {/* Details Dialog */}
      <Dialog
        open={openDialog && !deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
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
                  <Typography sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {selectedContact.phone}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {selectedContact.phone}
                  </Typography>
                  <Typography>
                    <strong>Favourite:</strong>{" "}
                    {selectedContact.favourite ? "Yes" : "No"}
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
              Are you sure you want to delete "{selectedContact?.name}"? This
              action cannot be undone.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#666" }}>
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
