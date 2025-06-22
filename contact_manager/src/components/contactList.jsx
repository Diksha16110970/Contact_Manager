import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Chip,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Fade,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactList({
  contacts,
  onUpdateContact,
  onDeleteContact,
  onToggleFavorite,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  // Calculate pagination boundaries for slicing contacts array
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const currentContacts = contacts.slice(startIndex, endIndex);

  // Reset current page to 1 if it exceeds total pages (e.g., after deleting or filtering contacts)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [contacts.length, totalPages, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
      // Adjust page if the current page becomes empty after deletion
      if (currentContacts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    handleCloseDialog();
  };

  // Generate initials from contact name for avatar display
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Assign a color to avatar based on first character of name
  const getAvatarColor = (name) => {
    const colors = [
      "#1A3C5A",
      "#2AB7CA",
      "#FE6D73",
      "#4B5563",
      "#10B981",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Contact List: Displays paginated contacts with a scrollable container */}
      <Box sx={{ flex: 1, maxHeight: "400px", overflowY: "auto", mb: 2 }}>
        {currentContacts.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "#6B7280", py: 4 }}>
            No contacts found.
          </Typography>
        ) : (
          currentContacts.map((contact, index) => (
            <Fade in={true} timeout={300 + index * 100} key={contact.id}>
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #E5E7EB",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: getAvatarColor(contact.name),
                          color: "#FFFFFF",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          mr: 2,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        {getInitials(contact.name)}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "#1A3C5A",
                              fontSize: "1.1rem",
                              mr: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {contact.name}
                          </Typography>
                          {contact.favourite && (
                            <Chip
                              label="Favorite"
                              size="small"
                              sx={{
                                backgroundColor: "#FFF1F2",
                                color: "#FE6D73",
                                fontSize: "0.7rem",
                                height: 20,
                                fontWeight: 500,
                              }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.9rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {contact.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 2 }}>
                      <Tooltip title={contact.favourite ? "Remove from favorites" : "Add to favorites"}>
                        <IconButton
                          onClick={() => onToggleFavorite(contact.id)}
                          size="small"
                          sx={{
                            color: contact.favourite ? "#FE6D73" : "#9CA3AF",
                            "&:hover": {
                              backgroundColor: contact.favourite ? "#FFF1F2" : "#F3F4F6",
                              color: contact.favourite ? "#F43F5E" : "#6B7280",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          {contact.favourite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View details">
                        <Button
                          size="small"
                          onClick={() => handleDetailsClick(contact)}
                          startIcon={<VisibilityIcon fontSize="small" />}
                          sx={{
                            minWidth: "auto",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            backgroundColor: "#F9FAFB",
                            color: "#4B5563",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            "&:hover": {
                              backgroundColor: "#E0F2FE",
                              color: "#1A3C5A",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          Details
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))
        )}
      </Box>

      {/* Pagination: Displays navigation for paginated contacts if more than one page exists */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 1, gap: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              fontSize: "0.8rem",
            }}
          >
            Page {currentPage} of {totalPages}
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#6B7280",
                fontSize: "0.8rem",
                minWidth: 28,
                height: 28,
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
                "&.Mui-selected": {
                  backgroundColor: "#2AB7CA",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#22D3EE",
                  },
                },
                "&.MuiPaginationItem-previousNext": {
                  color: currentPage === 1 || currentPage === totalPages ? "#D1D5DB" : "#2AB7CA",
                  "&:hover": {
                    backgroundColor: currentPage === 1 || currentPage === totalPages ? "transparent" : "#E0F2FE",
                  },
                },
              },
            }}
          />
        </Box>
      )}

      {/* Details Dialog: Shows detailed contact information with edit/delete options */}
      <Dialog
        open={openDialog && !deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            pb: 1,
            backgroundColor: "#1A3C5A",
            color: "#FFFFFF",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Contact Details
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3, backgroundColor: "#F9FAFB" }}>
          {selectedContact && (
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 3,
                  backgroundColor: getAvatarColor(selectedContact.name),
                  color: "#FFFFFF",
                  fontSize: "2rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {getInitials(selectedContact.name)}
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#1A3C5A", mb: 1 }}>
                {selectedContact.name}
              </Typography>
              {selectedContact.favourite && (
                <Chip
                  label="★ Favorite Contact"
                  sx={{
                    backgroundColor: "#FFF1F2",
                    color: "#FE6D73",
                    fontWeight: 600,
                    mb: 3,
                  }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  mt: 3,
                  textAlign: "left",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#E0F2FE",
                      color: "#1A3C5A",
                    }}
                  >
                    <PersonIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1A3C5A" }}>
                      {selectedContact.name}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, borderColor: "#E5E7EB" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#D1FAE5",
                      color: "#10B981",
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1A3C5A" }}>
                      {selectedContact.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, borderColor: "#E5E7EB" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#FFF1F2",
                      color: "#FE6D73",
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1A3C5A" }}>
                      {selectedContact.phone || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 1, borderColor: "#E5E7EB" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#F3E8FF",
                      color: "#8B5CF6",
                    }}
                  >
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.9rem" }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1A3C5A" }}>
                      {selectedContact.address || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2, backgroundColor: "#F9FAFB" }}>
          <Button
            onClick={handleEditClick}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              flex: 1,
              py: 1.5,
              backgroundColor: "#2AB7CA",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#22D3EE" },
              textTransform: "none",
            }}
          >
            Edit Contact
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              flex: 1,
              py: 1.5,
              backgroundColor: "#FE6D73",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#F43F5E" },
              textTransform: "none",
            }}
          >
            Delete Contact
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              borderColor: "#E5E7EB",
              color: "#6B7280",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F3F4F6",
              },
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog: Prompts user to confirm contact deletion */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1, backgroundColor: "#1A3C5A", color: "#FFFFFF" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#FFF1F2",
              color: "#FE6D73",
              mx: "auto",
              mb: 2,
            }}
          >
            <DeleteIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Delete Contact
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", px: 3, pb: 2, backgroundColor: "#F9FAFB" }}>
          <Typography sx={{ color: "#6B7280", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#1A3C5A" }}>"{selectedContact?.name}"</strong>?
          </Typography>
          <Typography sx={{ color: "#6B7280", fontSize: "0.95rem", mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2, backgroundColor: "#F9FAFB" }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              borderColor: "#E5E7EB",
              color: "#6B7280",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F3F4F6",
              },
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              flex: 1,
              py: 1.5,
              backgroundColor: "#FE6D73",
              color: "#FFFFFF",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#F43F5E" },
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