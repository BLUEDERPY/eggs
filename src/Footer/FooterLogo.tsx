import React from 'react';
import { Box, Typography } from '@mui/material';
import { Egg } from 'lucide-react';

export const FooterLogo: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Egg color="#fc9c04" size={20} />
      <Typography
        variant="subtitle1"
        sx={{ ml: 1, fontWeight: 'bold', color: 'white' }}
      >
        Eggs Finance
      </Typography>
    </Box>
  );
}