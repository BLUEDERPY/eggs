import React from 'react';
import { Box, keyframes } from '@mui/material';
import { Egg } from 'lucide-react';
import { GridPosition } from '../../types/grid';

const float = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(0, -10px) rotate(var(--rotation-angle));
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
`;

interface AnimatedEggProps {
  position: GridPosition;
  size: number;
  color: string;
  delay: number;
}

export const AnimatedEgg: React.FC<AnimatedEggProps> = ({ position, size, color, delay }) => {
  // Generate a random rotation angle between -30 and 30 degrees
  const rotationAngle = React.useMemo(() => 
    Math.floor(Math.random() * 61) - 30, 
    []
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `${float} 8s infinite ease-in-out`,
        animationDelay: `${delay}s`,
        opacity: 0.03,
        transition: 'opacity 0.3s ease-in-out',
        '--rotation-angle': `${rotationAngle}deg`,
        '&:hover': {
          opacity: 0.06,
        },
      }}
    >
      <Box
        sx={{
          transform: `rotate(${Math.random() * 360}deg)`,
          display: 'inline-flex',
        }}
      >
        <Egg size={size} color={color} />
      </Box>
    </Box>
  );
};