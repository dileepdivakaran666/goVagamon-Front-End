import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const mapContainerStyleSmall = {
  width: '300px', // Small map size
  height: '200px',
};

const mapContainerStyleLarge = {
  width: '100%', // Expanded map size
  height: '400px',
};

const center = {
  lat: 9.6605, // Latitude of Vagamon
  lng: 76.9111, // Longitude of Vagamon
};

const CollapsibleMap = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMapSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ position: 'relative', mb: 3, borderRadius: "16px", border: "1px solid #ccc", p: 2}}>
      <LoadScript googleMapsApiKey="AIzaSyA-UR8mSDQhB6JJ4WPzKPbZPxKp1viFC_E">
        <GoogleMap
          mapContainerStyle={isExpanded ? mapContainerStyleLarge : mapContainerStyleSmall}
          zoom={12} // Adjust the zoom level
          center={center}
        >
          {/* Add a marker for Vagamon */}
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>

      {/* Expand/Collapse Button */}
      <IconButton
        onClick={toggleMapSize}
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          backgroundColor: 'white',
          boxShadow: 1,
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  );
};

export default CollapsibleMap;