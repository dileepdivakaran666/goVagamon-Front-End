import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, TextField, Button, CircularProgress,Grid2 } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Ensure you have an AuthContext
import { getRatings, submitRating } from "../services/ApiServices"; // Import API functions

const RatingComponent = ({ resortId }) => {
    const { isLoggedIn } = useAuth(); // Get user info
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newRating, setNewRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await getRatings(resortId);
                setRatings(response.data);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRatings();
    }, [resortId]);

    

    const handleRatingSubmit = async () => {
        if (!isLoggedIn) {
            alert("You must be logged in to rate this resort.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await submitRating(resortId, newRating, comment);

            if (response.status === 201) {
                setRatings([...ratings, response.data.rating]); // Append new rating
                setNewRating(0);
                setComment("");
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <CircularProgress />;

    return (<>
        <Box>
            <Typography variant="h5">User Ratings</Typography>

            {/* Display Existing Ratings */}
            {ratings.length === 0 ? (
                <Typography>No ratings yet.</Typography>
            ) : (
                ratings.map((r, index) => (
                    <Grid2 container spacing={4}>
                    <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
                        <Typography variant="subtitle1" sx={{display: "flex", alignItems: "center"}}>
                            {r.username} - <Rating value={r.rating} readOnly />
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {r.comment}
                        </Typography>
                    </Box>
                    </Grid2>
                ))
            )}
        </Box>
        
        <Box sx={{ mt: 4, p: 3, border: "1px solid #ddd", borderRadius: "8px", width: { xs: "100%", sm: "50%" }}}>
            {/* Add New Rating */}
            {isLoggedIn && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Leave a Rating</Typography>
                    <Rating value={newRating} onChange={(e, newValue) => setNewRating(newValue)} precision={0.5} />
                    <TextField
                        fullWidth
                        label="Write a comment"
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        sx={{ mt: 2, textTransform:"none" }}
                        onClick={handleRatingSubmit}
                        disabled={submitting || newRating === 0}
                    >
                        {submitting ? "Submitting..." : "Submit Rating"}
                    </Button>
                </Box>
            )}
        </Box>
        </>
    );
};

export default RatingComponent;
