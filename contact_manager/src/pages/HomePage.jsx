import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  Paper,
  Container,
  Chip,
  InputAdornment,
  CircularProgress,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactsIcon from "@mui/icons-material/Contacts";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    searchInput,
    setSearchInput,
    showFavouritesOnly,
    setShowFavouritesOnly,
  } = useContactStore();
  
  const { data, isLoading } = useContacts(1, searchInput);
  const contacts = data?.data || [];
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

  const favoriteCount = contacts.filter(c => c.favourite).length;

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
      });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
  };

  const getContainerHeight = () => {
    const baseHeight = 200; // Header + search + stats + button
    const contactHeight = 120; // Approximate height per contact card
    const maxContactsVisible = 4; // Maximum contacts to show before scrolling
    const contactsToShow = Math.min(filteredContacts.length, maxContactsVisible);
    return baseHeight + (contactsToShow * contactHeight);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        p: 0,
        margin: 0,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          p: isMobile ? 1 : 2,
        }}
      >
        <Fade in={true} timeout={600}>
          <Paper
            elevation={20}
            sx={{
              width: "100%",
              maxWidth: {
                xs: "95%",
                sm: 480,
                md: 520,
                lg: 580,
              },
              minHeight: getContainerHeight(),
              maxHeight: "90vh",
              borderRadius: 4,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                color: "#1e293b",
                px: 3,
                py: 2.5,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(59, 130, 246, 0.08)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(139, 92, 246, 0.06)",
                }}
              />
              
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <ContactsIcon sx={{ fontSize: 32, mr: 1, color: "#3b82f6" }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.8rem", sm: "2.1rem" },
                    textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  Contact Manager
                </Typography>
              </Box>
              
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.7,
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "#64748b",
                }}
              >
                Organize your contacts professionally
              </Typography>
            </Box>

            {/* Stats Section */}
            <Box
              sx={{
                px: 3,
                py: 2,
                backgroundColor: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Chip
                  icon={<ContactsIcon />}
                  label={`${contacts.length} Total Contacts`}
                  sx={{
                    backgroundColor: "#EBF8FF",
                    color: "#2563EB",
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "#2563EB" },
                  }}
                />
                <Chip
                  icon={<FavoriteIcon />}
                  label={`${favoriteCount} Favorites`}
                  sx={{
                    backgroundColor: "#FEF3C7",
                    color: "#D97706",
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "#D97706" },
                  }}
                />
              </Box>
            </Box>

            {/* Search and Filter Section */}
            <Box sx={{ px: 3, py: 2.5, backgroundColor: "white" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Search contacts"
                  variant="outlined"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#64748B" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#F8FAFC",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2563EB",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2563EB",
                      },
                    },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#F8FAFC",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    border: "1px solid #E2E8F0",
                    minWidth: "fit-content",
                  }}
                >
                  <Switch
                    checked={showFavouritesOnly}
                    onChange={(e) => setShowFavouritesOnly(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#F59E0B",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#F59E0B",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: "#475569",
                      fontSize: "0.9rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Show Favorites
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Content Section */}
            <Box
              sx={{
                flex: 1,
                px: 3,
                py: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                    gap: 2,
                  }}
                >
                  <CircularProgress size={48} sx={{ color: "#3b82f6" }} />
                  <Typography
                    sx={{
                      color: "#64748B",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    Loading contacts...
                  </Typography>
                </Box>
              ) : filteredContacts.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                    gap: 2,
                  }}
                >
                  <ContactsIcon sx={{ fontSize: 64, color: "#CBD5E1" }} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#475569",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {searchInput || showFavouritesOnly
                      ? "No contacts match your criteria"
                      : "No contacts found"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#64748B",
                      textAlign: "center",
                      fontSize: "0.95rem",
                    }}
                  >
                    {searchInput || showFavouritesOnly
                      ? "Try adjusting your search or filters"
                      : "Add your first contact to get started"}
                  </Typography>
                </Box>
              ) : (
                <ContactList
                  contacts={filteredContacts}
                  onUpdateContact={handleEdit}
                  onDeleteContact={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </Box>

            {/* Add Contact Button */}
            <Box sx={{ px: 3, py: 2.5, backgroundColor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentUser(null);
                  setIsFormOpen(true);
                }}
                startIcon={<PersonAddIcon />}
                fullWidth
                sx={{
                  py: 1.5,
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: 3,
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    boxShadow: "0 6px 16px rgba(59, 130, 246, 0.35)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Add New Contact
              </Button>
            </Box>

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
              onClose={handleFormClose}
            />
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}