import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface SocialIconProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, label, href }) => {
  return (
    <Tooltip title={label}>
      <IconButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: 'grey.400',
          '&:hover': {
            color: 'primary.main',
            bgcolor: 'rgba(252, 156, 4, 0.08)',
          },
        }}
      >
        <Icon size={20} />
      </IconButton>
    </Tooltip>
  );
};