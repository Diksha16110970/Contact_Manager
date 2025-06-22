import React, { useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useForm, Controller } from "react-hook-form";
import { useAddContact, useUpdateContact } from "../hooks/useContacts";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

export default function ContactForm({
  currentUser,
  open,
  setOpen,
  onAddSuccess,
  onUpdateSuccess,
  onClose,
}) {
  // React hook form setup with memoized default values to avoid stale form state
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      isFavourite: currentUser?.favourite || false,
    }),
    [currentUser]
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  console.log(`currentUser == ${JSON.stringify(currentUser)}`);
  const addContactMutation = useAddContact();
  const updateContactMutation = useUpdateContact();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  // Reset form when dialog is closed to ensure clean slate for new contact
  useEffect(() => {
    if (!open) {
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        isFavourite: false,
      });
    }
  }, [open, reset]);

  // Prefill form values when editing an existing contact

  useEffect(() => {
    if (currentUser && open) {
      setValue("name", currentUser.name || "");
      setValue("email", currentUser.email || "");
      setValue("phone", currentUser.phone || "");
      setValue("address", currentUser.address || "");
      setValue("isFavourite", currentUser.favourite || false);
    } else if (!open) {
      reset();
    }
  }, [currentUser, open, reset, setValue]);

  const handleClose = () => {
    setOpen(false);
    onClose?.(); //  notify parent to clear currentUser
  };

  // Unified form submission logic for both add and update actions
  const onSubmit = async (data) => {
    try {
      if (currentUser) {
        updateContactMutation.mutate(
          {
            ...currentUser,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            favourite: data.isFavourite,
          },
          {
            onSuccess: () => {
              
              onUpdateSuccess?.();
              queryClient.refetchQueries(["contacts", 1, ""]);
              setOpen(false);
            },
            onError: (error) => {
              enqueueSnackbar("Error updating contact", { variant: "error" });
              console.error("Error updating contact:", error.message || error);
            },
          }
        );
      } else {
        addContactMutation.mutate(
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            favourite: data.isFavourite,
          },
          {
            onSuccess: () => {
              
              onAddSuccess?.();
              queryClient.refetchQueries(["contacts", 1, ""]);
              setOpen(false);
            },
            onError: (error) => {
              enqueueSnackbar("Error adding contact", { variant: "error" });
              console.error("Error adding contact:", error.message || error);
            },
          }
        );
      }
    } catch (error) {
      enqueueSnackbar("Unexpected error occurred", { variant: "error" });
      console.error("Error submitting contact:", error.message || error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            backgroundColor: "#1A3C5A",
            color: "#fff",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {currentUser ? "Edit Contact" : "Add New Contact"}
              </Typography>
              <Typography variant="body2">
                {currentUser
                  ? "Update the contact details below"
                  : "Fill in the details below"}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 2,
            py: 2,
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Full Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,      // Only allows exactly 10 digit numbers
                message: "Phone number must be exactly 10 digits",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "4px" } }}
              />
            )}
          />
          <Controller
            name="isFavourite"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value} // make checkbox controlled
                    onChange={(e) => field.onChange(e.target.checked)} // update correctly
                  />
                }
                label="Mark as Favourite"
              />
            )}
          />
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: "4px" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{
              backgroundColor: "#1A3C5A",
              color: "#fff",
              "&:hover": {},
              borderRadius: "4px",
            }}
          >
            {currentUser ? "Update Contact" : "Create Contact"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
