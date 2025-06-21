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
          {selectedContact && (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Avatar
                alt={selectedContact.name}
                src={`https://ui-avatars.com/api/?name=${selectedContact.name}&background=random`}
                sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
              />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Contact Details
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  background: "#f9f9f9",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <Typography>
                  <strong>Name:</strong> {selectedContact.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedContact.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {selectedContact.phone || "N/A"}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {selectedContact.address || "N/A"}
                </Typography>
                <Typography>
                  <strong>Favourite:</strong>{" "}
                  {selectedContact.favourite ? "Yes" : "No"}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
          <Button
            onClick={handleEditClick}
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": { backgroundColor: "#0056b3" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Edit
          </Button>

          <Button
            onClick={handleDeleteClick}
            variant="contained"
            sx={{
              backgroundColor: "#dc3545",
              color: "#fff",
              "&:hover": { backgroundColor: "#c82333" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Delete
          </Button>

          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: "#6c757d",
              color: "#fff",
              "&:hover": { backgroundColor: "#5a6268" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 4,
          },
        }}
      >
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: "#dc3545",
              textAlign: "center",
            }}
          >
            Confirm Delete
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 2 }}>
            Are you sure you want to delete{" "}
            <strong>"{selectedContact?.name}"</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: "#6c757d",
              color: "#fff",
              "&:hover": { backgroundColor: "#5a6268" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#dc3545",
              color: "#fff",
              "&:hover": { backgroundColor: "#c82333" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
