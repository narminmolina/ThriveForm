import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { ReservationForm } from "./ReservationForm";

export type Reservation = {
  id?: string;
  pet_name: string;
  pet_age: number | null;
  reservation_type: string;
  reservation_date: string;
  owner_name: string;
  owner_email: string;
  owner_phone: number | null;
};

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editFormValues, setEditFormValues] = useState<Reservation | null>(
    null
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/reservations"
        );
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        console.log("🚀 ~ fetchReservations ~ err:", err);
        setError("Failed to fetch reservations");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  const handleDelete = async (id?: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/reservations/${id}}`);
      window.location.reload();
    } catch (err) {
      console.log("🚀 ~ handleDelete ~ err:", err);
      setError("Failed to delete reservation");
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setEditFormValues(reservation);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditFormValues(null);
    setOpen(false);
  };

  return (
    <>
      <div className="header">
        <h1>Pet House</h1>
        <Button size="medium" variant="contained" onClick={() => setOpen(true)}>
          + Make Reservation
        </Button>
      </div>
      <h2>My Reservations</h2>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
        }}
      >
        {reservations.map((reservation: Reservation) => (
          <Paper
            sx={{
              padding: 2,
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              bgcolor: "#f9f8f9",
            }}
            key={reservation.id}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">
                <strong>Pet Name:</strong> {reservation.pet_name}
              </Typography>
              <Box display="flex" gap="1rem">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEdit(reservation)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(reservation?.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap="1rem"
            >
              <Typography>
                <strong>Age:</strong> {reservation.pet_age}
              </Typography>
              <Typography>
                <strong>Reservation Type:</strong>{" "}
                {reservation.reservation_type}
              </Typography>
              <Typography>
                <strong>Reservation Date:</strong>{" "}
                {reservation.reservation_date}
              </Typography>
              <Typography>
                <strong>Owner:</strong> {reservation.owner_name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {reservation.owner_email}
              </Typography>
              <Typography>
                <strong>Phone:</strong>
                {reservation.owner_phone}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editFormValues?.id ? "Edit" : "Make"} Reservation
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            x
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ReservationForm
            cancel={handleCloseDialog}
            editFormValues={editFormValues}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
