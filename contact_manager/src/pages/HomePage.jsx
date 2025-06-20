import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContacts } from "../hooks/useContacts";
import  ContactList  from "../components/ContactList";
export default function HomePage() {
  const { data, isLoading } = useContacts(1); // Fetching page 1
  const contacts = data?.data || [];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: isMobile ? 1 : 2,
        background: "#f0f4ff",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "90%" : isTablet ? "500px" : "400px",
          maxWidth: "600px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          p: isMobile ? 1 : 2,
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: isMobile ? 1 : 2,
            color: "#333",
            textAlign: "center",
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          Contact List
        </Typography>

        <Box sx={{ overflowY: "auto", width: "100%" }}>
          {isLoading ? (
            <Typography
              sx={{
                fontSize: isMobile ? "14px" : "16px",
                textAlign: "center",
              }}
            >
              Loading...
            </Typography>
          ) : contacts.length === 0 ? (
            <Typography
              sx={{
                fontSize: isMobile ? "14px" : "16px",
                textAlign: "center",
              }}
            >
              No contacts found
            </Typography>
          ) : (
            <ContactList contacts={contacts} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
