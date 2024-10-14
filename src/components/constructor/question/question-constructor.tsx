import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { AnswerConstructor } from "../answer/answer-constructor";
import { answerTypes } from "../answer/types";
import { StyledTextarea } from "./styled-textarea";

type QuestionConstructorConfig = {
  title: string;
  description: string;
  answerType: string;
  isRequired: boolean;
  isShown: boolean;
  id: string;
};

export const QuestionConstructor: FC<{
  question: QuestionConstructorConfig;
}> = ({ question }) => {
  // TODO validate type more strict

  const { title, description, answerType, isRequired, isShown, id } = question;
  const [answerTypeAAA, setAnswerTypeAAA] = useState<string>(answerType);

  return (
    <Stack
      sx={{
        padding: "3% 2%",
        marginTop: 1,
        gap: 1,
      }}
    >
      <Typography>{id}</Typography>
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
            value={title}
            size="small"
            required
            name={"question-title"}
          />
          <StyledTextarea
            value={description}
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
            value={answerTypeAAA}
            onChange={(e) => {
              setAnswerTypeAAA(e.target.value);
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
          checked={isRequired}
          control={<Checkbox />}
          label="Is question required"
        />
        <FormControlLabel
          required
          checked={isShown}
          control={<Checkbox />}
          label="Show question in form"
        />
      </FormGroup>
    </Stack>
  );
};
