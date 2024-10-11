import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import { FC } from "react";

export const QuestionConstructor: FC = () => {
  // TODO toggle required prop of question
  return (
    <Stack
      sx={{
        padding: " 3% 2%",
        marginTop: 1,
        gap: 1,
        border: "1px white solid",
      }}
    >
      <TextField
        autoComplete={"question-title"}
        label={"title"}
        placeholder={"type some title"}
        size="small"
        required
        name={"question-title"}
      />
      <TextField
        autoComplete={"question-description"}
        label={"description"}
        placeholder={"type some description"}
        size="small"
        required
        name={"question-description"}
      />
      <FormGroup>
        <FormControlLabel
          required
          control={<Checkbox />}
          label="Is question required"
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          label="Show question in form"
        />
      </FormGroup>
    </Stack>
  );
};
