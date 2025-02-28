import { Box, Button, Typography, Container, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
import img3 from "../assets/vagamon1.jpeg";

const Banner = () => {
  const bannerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const [resort, setResort] = useState("");
  const [date, setDate] = useState(null);
  const [roomType, setRoomType] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { resort, date, roomType });
  };

  return (
    <Box
      ref={bannerRef}
      sx={{
        position: "relative",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${img3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          y: yBackground,
        }}
      />

      {/* Content */}
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Explore. Experience. Escape.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover the beauty of Vagamon with the best stays and adventures.
        </Typography>

      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {/* Search Inputs */}
        <Box sx={{ display: "flex", flexDirection: "row",justifyContent:"center", mt: 3 }}>
          <TextField
            label="Search Resort"
            variant="outlined"
            value={resort}
            onChange={(e) => setResort(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: "8px 0 0 8px" }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: "white" }} />}
              slotProps={{
                textField: {
                  sx: {
                    minWidth: 200,
                    backgroundColor: "#e6f7ff", // Light blue background
                  },
                },
              }}
            />
          </LocalizationProvider>

          <FormControl  sx={{ backgroundColor: "white", width:'200px' }}>
            <InputLabel>Room Type</InputLabel>
            <Select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <MenuItem value="single">Single Room</MenuItem>
              <MenuItem value="double">Double Room</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "blue",
              "&:hover": { backgroundColor: "#1976d2" },
              padding: "12px 24px",
              fontSize: "18px",
              borderRadius: "0 8px 8px 0",
              textTransform:'none'
            }}
            onClick={handleSearch}
          >
            Search
          </Button>

        </Box>
      </motion.div>
        
      </Container>

      {/* Gradient Overlay for Better Text Visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, rgba(61, 61, 61, 0.7), rgba(107, 107, 107, 0.2))",
        }}
      />
    </Box>
  );
};

export default Banner;
