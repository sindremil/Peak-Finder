import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  return (
    <Typography>
      <Link to="/create-user">Lag Bruker</Link>
    </Typography>
  );
}
