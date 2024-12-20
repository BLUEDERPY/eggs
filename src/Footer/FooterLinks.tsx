import React from 'react';
import { Stack } from '@mui/material';
import { FooterLink } from './FooterLink';

export const FooterLinks: React.FC = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        '& > a': {
          fontSize: '0.875rem',
        }
      }}
    >
      <FooterLink href="/terms">Terms</FooterLink>
      <FooterLink href="/privacy">Privacy</FooterLink>
      <FooterLink href="/docs">Docs</FooterLink>
    </Stack>
  );
}