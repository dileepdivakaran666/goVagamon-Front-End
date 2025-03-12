import React, { useEffect, useState } from 'react';
import { getresorts, deleteResort } from '../services/ApiServices';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

const ResortsListPage = () => {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    fetchResorts();
  }, []);

  const fetchResorts = async () => {
    try {
      const res = await getresorts();
      setResorts(res);
    } catch (error) {
      console.error('Failed to fetch resorts', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resort?')) {
      try {
        await deleteResort(id);
        fetchResorts(); // Refresh list after deletion
      } catch (error) {
        console.error('Error deleting resort:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Resorts
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          {resorts?.map((resort) => (
            <ListItem key={resort._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={resort.name} />
              <Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to={`/admin/edit-resort/${resort._id}`} 
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDelete(resort._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ResortsListPage;
