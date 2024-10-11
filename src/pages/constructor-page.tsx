import { type JSX } from "react";

import { getAuthorizedUser } from "../requests/get-authorized-user";
import {
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "@/hooks/use-auth";

const Constructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    console.log(getAuthorizedUser());
  }
  return (
    <>
      {isAuthenticated ? (
        <>
          <Typography
            component="h1"
            mb={1}
            mt={3}
            textAlign="center"
            variant="h4"
          >
            Authorized user constructor page
          </Typography>
          <Stack width="60%" margin="0 auto">
            <TextField
              autoComplete={"title"}
              label={"title"}
              placeholder={"title"}
              required
              size="small"
              name="template-title"
            />
            <TextField
              autoComplete={"description"}
              label={"description"}
              placeholder={"description"}
              required
              size="small"
              name="template-description"
            />
            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"topic 1"}
              label="Topic"
              onChange={() => {}}
            >
              <MenuItem value={"topic 1"}>topic 1</MenuItem>
              <MenuItem value={"topic 2"}>topic 2</MenuItem>
              <MenuItem value={"topic 3"}>topic 3</MenuItem>
            </Select>
            <TextField
              autoComplete={"title"}
              label={"title"}
              placeholder={"title"}
              required
              size="small"
              name="template-title"
            />
          </Stack>
        </>
      ) : (
        <Typography
          component="h1"
          mb={4}
          mt={7}
          textAlign="center"
          variant="h3"
        >
          Log in to view this page
        </Typography>
      )}
    </>
  );
};
export default Constructor;
