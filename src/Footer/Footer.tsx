import React from 'react';
import { Box, Container, Typography, Stack, Divider } from '@mui/material';
import { Egg } from 'lucide-react';
import { FooterLink } from './FooterLink';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        mt: 'auto',
        py: 4,
        borderTop: '1px solid',
        borderColor: 'grey.800',
      }}
    >
      <Container>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Egg color="#fc9c04" size={24} />
            <Typography
              variant="h6"
              sx={{ ml: 1, fontWeight: 'bold', color: 'white' }}
            >
              Eggs Finance
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/docs">Documentation</FooterLink>
          </Stack>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'grey.500' }}
          >
            © {new Date().getFullYear()} Eggs Finance. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};