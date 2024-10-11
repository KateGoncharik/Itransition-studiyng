import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { AnswerConstructor } from "../answer/answer-constructor";
import { answerTypes } from "../answer/types";
import { StyledTextarea } from "./styled-textarea";

export const QuestionConstructor: FC = () => {
  // TODO validate type more strict
  // TODO markdown support

  const [answerType, setAnswerType] = useState<string>(
    answerTypes.oneLineString,
  );

  return (
    <Stack
      sx={{
        padding: "3% 2%",
        marginTop: 1,
        gap: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",

          width: "100%",
        }}
      >
        <Stack gap={2} width={"45%"}>
          <TextField
            autoComplete={"question-title"}
            label={"Title"}
            placeholder={"Some title"}
            size="small"
            required
            name={"question-title"}
          />
          <StyledTextarea
            autoComplete="question-description"
            required={true}
            name="question-description"
            placeholder={"Some description\n"}
          />
        </Stack>
        <Stack gap={2} width={"45%"}>
          <InputLabel id="select-answer-type-label">Answer type</InputLabel>
          <Select
            labelId="select-answer-type-label"
            id="answer-type-select"
            value={answerType}
            onChange={(e) => {
              setAnswerType(e.target.value);
            }}
          >
            <MenuItem value={answerTypes.oneLineString}>
              One line string
            </MenuItem>
            <MenuItem value={answerTypes.multilineString}>
              Multiline string
            </MenuItem>
            <MenuItem value={answerTypes.number}>Number</MenuItem>
            <MenuItem value={answerTypes.checkbox}>Checkbox</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <AnswerConstructor type={answerType} />
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
