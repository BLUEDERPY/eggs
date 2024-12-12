import { Typography, Link, Card } from "@mui/material";

const AnnouncementBox = () => {
  return (
    <Card>
      <Typography variant="h6" gutterBottom>
        {" "}
        Baseline yescention announced{" "}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {" "}
        The protocol will be unwound and migrated to a new version. You have a
        choice of either claiming WSONIC pro-rata at a premium to floor price, or
        ascending into a new realm by helping bootstrap YES V2 presale, securing
        the best entry price on the new token.
      </Typography>
      <Typography variant="subtitle1">
        {" "}
        Learn more in the <span> </span>
        <Link
          underline="always"
          color="inherit"
          href="https://mirror.xyz/0xe7AD459A24A10C5E94B76CcD24da62A8394eBf5f/egAUJ7mxagSBF_s9tsFqV4R_ATLMh_GfjasRe4YITKM"
        >
          announcement post{" "}
        </Link>
      </Typography>
    </Card>
  );
};

export default AnnouncementBox;
