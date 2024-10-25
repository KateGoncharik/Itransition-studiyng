import { Button, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/Animation - 1729849078176.json";

export default function NotFoundPage(): ReactNode {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Stack sx={{ margin: "2% auto", gap: 1, alignItems: "center" }}>
      <Typography component="h1" variant="h2">
        Oh, hi!
      </Typography>
      <Typography variant="h4" color="info">
        404
      </Typography>

      <Lottie options={defaultOptions} height={300} width={300} />
      <Typography> Sorry, but here is nothing to do</Typography>

      <Typography>
        {`Page "${window.location.pathname}" does not exist`}
      </Typography>
      <Link to="/">
        <Button variant="contained">Back to main</Button>
      </Link>
    </Stack>
  );
}
