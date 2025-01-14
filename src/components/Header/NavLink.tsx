import React from "react";
import { Button, Link } from "@mui/material";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <Button
        sx={{
          color: "grey.300",
          px: { xs: 1, sm: 2 },
          py: 1,
          "&:hover": {
            color: "primary.main",
            bgcolor: "rgba(252, 156, 4, 0.08)",
          },
          borderRadius: 1,
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
