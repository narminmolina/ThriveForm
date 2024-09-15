import { Box, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Reservation } from "./App";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "./components/TextField";
import { Select } from "./components/Select";

type ReservationFormProps = {
  editFormValues?: Reservation | null;
  cancel: () => void;
};

const reservationSchema = z
  .object({
    pet_name: z.string().trim().min(1, { message: "Pet name is required" }),
    pet_age: z.number().nullable().optional(),
    owner_name: z.string(),
    owner_email: z.string(),
    owner_phone: z.number().nullable().optional(),
    reservation_type: z.string(),
    reservation_date: z
      .string()
      .min(1, { message: "Reservation date is required" }),
  })
  .superRefine(({ owner_phone, owner_email }, refinementContext) => {
    if (owner_phone) {
      if (!/^\d{10}$/.test(owner_phone.toString())) {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner phone must be a 10-digit number",
          path: ["owner_phone"],
        });
      }
    }
    if (owner_email) {
      if (!/^.+@.+\..+$/.test(owner_email)) {
        return refinementContext.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner email must be a valid email address",
          path: ["owner_email"],
        });
      }
    }
  });

type ReservationFormSchema = z.infer<typeof reservationSchema>;

const defaultFormValues: ReservationFormSchema = {
  pet_name: "",
  pet_age: undefined,
  owner_name: "",
  owner_email: "",
  owner_phone: undefined,
  reservation_type: "",
  reservation_date: "",
};

export const ReservationForm = ({
  editFormValues,
  cancel,
}: ReservationFormProps) => {
  const isEditMode = !!editFormValues?.id;

  const { handleSubmit, control } = useForm<ReservationFormSchema>({
    defaultValues: defaultFormValues,
    values: editFormValues || defaultFormValues,
    resolver: zodResolver(reservationSchema),
  });

  const editMutation = async (formValues: ReservationFormSchema) => {
    try {
      await axios.put(
        `http://localhost:3000/api/reservations/${editFormValues?.id}`,
        formValues
      );
      window.location.reload();
      cancel();
    } catch (error) {
      alert("Failed to update reservation");
      console.error("Failed to update reservation:", error);
      cancel();
    }
  };

  const createMutation = async (formValues: ReservationFormSchema) => {
    try {
      await axios.post(`http://localhost:3000/api/reservations/`, formValues);
      window.location.reload();
      cancel();
    } catch (error) {
      console.error("Failed to update reservation:", error);
      cancel();
    }
  };

  const submitHandler = async (formValues: ReservationFormSchema) => {
    if (isEditMode) {
      await editMutation(formValues);
    } else {
      await createMutation(formValues);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submitHandler)}
      sx={{
        width: 400,
        pt: 1,
        bgcolor: "white",
        color: "black",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        ml: "auto",
        mr: "auto",
      }}
    >
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <TextField
          fullWidth
          label="Pet Name"
          placeholder="Enter Pet Name"
          variant="outlined"
          name="pet_name"
          control={control}
          required
        />
        <TextField
          fullWidth
          label="Pet Age"
          placeholder="Enter Pet Age"
          type="number"
          variant="outlined"
          inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]*" }}
          name="pet_age"
          control={control}
        />
      </Box>
      <TextField
        fullWidth
        label="Owner Name"
        placeholder="Enter Owner Name"
        variant="outlined"
        name="owner_name"
        control={control}
      />
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <TextField
          fullWidth
          label="Owner Email"
          placeholder="Enter Owner Email"
          type="email"
          variant="outlined"
          name="owner_email"
          control={control}
        />
        <TextField
          fullWidth
          label="Owner Phone"
          placeholder="Enter Owner Phone"
          type="phone"
          variant="outlined"
          name="owner_phone"
          control={control}
        />
      </Box>

      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Select
          name="reservation_type"
          control={control}
          label="Reservation Type"
          menuItems={[
            { value: "boarding", label: "Boarding" },
            { value: "daycare", label: "Daycare" },
            { value: "training", label: "Training" },
            { value: "grooming", label: "Grooming" },
          ]}
          isRequired
        />
        <TextField
          label="Reservation Date"
          sx={{ width: "200px" }}
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="reservation_date"
          control={control}
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          ml: "auto",
        }}
      >
        <Button variant="outlined" color="primary" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
