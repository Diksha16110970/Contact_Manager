import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useState } from "react";
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
  Stack,
} from "@mui/material";

export default function ContactList({
  contacts,
  onUpdateContact,
  onDeleteContact,
  onToggleFavorite,
}) {
  // const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const currentContacts = contacts.slice(startIndex, endIndex);

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
      // If we're on the last page and it becomes empty, go to previous page
      if (currentContacts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    handleCloseDialog();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Reset to first page when contacts change (e.g., after search)
  useState(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [contacts.length, totalPages]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Contact List */}
      <Box sx={{ flex: 1, maxHeight: "400px", overflowY: "auto", mb: 2 }}>
        {currentContacts.map((contact, index) => (
          <Fade in={true} timeout={300 + index * 100} key={contact.id}>
            <Card
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: getAvatarColor(contact.name),
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        mr: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
                            color: "#2C3E50",
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
                              backgroundColor: "#FFF3E0",
                              color: "#F57C00",
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
                          color: "#64748B",
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
                          color: contact.favourite ? "#F59E0B" : "#94A3B8",
                          "&:hover": {
                            backgroundColor: contact.favourite ? "#FEF3C7" : "#F1F5F9",
                            color: contact.favourite ? "#D97706" : "#64748B",
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
                          backgroundColor: "#F8FAFC",
                          color: "#475569",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "#E2E8F0",
                            color: "#334155",
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
        ))}
      </Box>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 2,
            px: 1,
            backgroundColor: "#F8FAFC",
            borderRadius: 3,
            border: "1px solid #E2E8F0",
          }}
        >
          {/* Pagination Info */}
          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, contacts.length)} of {contacts.length} contacts
          </Typography>

          {/* Pagination Controls */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="First page">
              <IconButton
                onClick={() => handlePageChange(null, 1)}
                disabled={currentPage === 1}
                size="small"
                sx={{
                  color: currentPage === 1 ? "#CBD5E1" : "#475569",
                  "&:hover": {
                    backgroundColor: "#E2E8F0",
                  },
                }}
              >
                <FirstPageIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Previous page">
              <IconButton
                onClick={() => handlePageChange(null, currentPage - 1)}
                disabled={currentPage === 1}
                size="small"
                sx={{
                  color: currentPage === 1 ? "#CBD5E1" : "#475569",
                  "&:hover": {
                    backgroundColor: "#E2E8F0",
                  },
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#475569",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#E2E8F0",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#3B82F6",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#2563EB",
                    },
                  },
                },
              }}
              hidePrevButton
              hideNextButton
            />

            <Tooltip title="Next page">
              <IconButton
                onClick={() => handlePageChange(null, currentPage + 1)}
                disabled={currentPage === totalPages}
                size="small"
                sx={{
                  color: currentPage === totalPages ? "#CBD5E1" : "#475569",
                  "&:hover": {
                    backgroundColor: "#E2E8F0",
                  },
                }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Last page">
              <IconButton
                onClick={() => handlePageChange(null, totalPages)}
                disabled={currentPage === totalPages}
                size="small"
                sx={{
                  color: currentPage === totalPages ? "#CBD5E1" : "#475569",
                  "&:hover": {
                    backgroundColor: "#E2E8F0",
                  },
                }}
              >
                <LastPageIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}

      {/* Enhanced Details Dialog */}
      <Dialog
        open={openDialog && !deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            pb: 1,
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#1E293B" }}>
            Contact Details
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {selectedContact && (
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 3,
                  backgroundColor: getAvatarColor(selectedContact.name),
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                {getInitials(selectedContact.name)}
              </Avatar>

              <Typography variant="h4" sx={{ fontWeight: 600, color: "#1E293B", mb: 1 }}>
                {selectedContact.name}
              </Typography>

              {selectedContact.favourite && (
                <Chip
                  label="★ Favorite Contact"
                  sx={{
                    backgroundColor: "#FEF3C7",
                    color: "#D97706",
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
                      backgroundColor: "#EBF8FF",
                      color: "#2563EB",
                    }}
                  >
                    <PersonIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.9rem" }}>
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1E293B" }}>
                      {selectedContact.name}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#F0FDF4",
                      color: "#16A34A",
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.9rem" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1E293B" }}>
                      {selectedContact.email}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#FEF3C7",
                      color: "#D97706",
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.9rem" }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1E293B" }}>
                      {selectedContact.phone || "Not provided"}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: "#FDF2F8",
                      color: "#EC4899",
                    }}
                  >
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.9rem" }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#1E293B" }}>
                      {selectedContact.address || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2, backgroundColor: "#F8FAFC" }}>
          <Button
            onClick={handleEditClick}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              flex: 1,
              py: 1.5,
              backgroundColor: "#2563EB",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#1D4ED8" },
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
              backgroundColor: "#DC2626",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#B91C1C" },
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
              borderColor: "#D1D5DB",
              color: "#6B7280",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": { 
                borderColor: "#9CA3AF", 
                backgroundColor: "#F9FAFB" 
              },
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#FEE2E2",
              color: "#DC2626",
              mx: "auto",
              mb: 2,
            }}
          >
            <DeleteIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#1E293B" }}>
            Delete Contact
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", px: 3, pb: 2 }}>
          <Typography sx={{ color: "#64748B", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Are you sure you want to delete{" "}
            <strong style={{ color: "#1E293B" }}>"{selectedContact?.name}"</strong>?
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.95rem", mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              borderColor: "#D1D5DB",
              color: "#6B7280",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": { 
                borderColor: "#9CA3AF", 
                backgroundColor: "#F9FAFB" 
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
              backgroundColor: "#DC2626",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#B91C1C" },
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