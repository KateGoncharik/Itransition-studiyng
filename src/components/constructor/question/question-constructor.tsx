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
import { type QuestionFieldChangeHandler } from "@/pages/template-provider";
import { useCheckAnswerType } from "./check-answer-type";

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
  handleChange: QuestionFieldChangeHandler;
}> = ({ question, handleChange }) => {
  // TODO validate type more strict

  const { title, description, answerType, isRequired, isShown } = question;
  const { areTypesDisabled } = useCheckAnswerType();

  const [localAnswerType, setLocalAnswerType] = useState<string>(answerType);

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
            value={title}
            onChange={(e) => {
              handleChange(question.id, "title", e.target.value);
            }}
            size="small"
            required
            name={"question-title"}
          />
          <StyledTextarea
            value={description}
            autoComplete="question-description"
            required={true}
            onChange={(e) => {
              handleChange(question.id, "description", e.target.value);
            }}
            name="question-description"
            placeholder={"Some description\n"}
          />
        </Stack>
        <Stack gap={2} width={"45%"}>
          <InputLabel id="select-answer-type-label">Answer type</InputLabel>
          <Select
            labelId="select-answer-type-label"
            id="answer-type-select"
            value={localAnswerType}
            onChange={(e) => {
              handleChange(question.id, "answerType", e.target.value);
              setLocalAnswerType(e.target.value);
            }}
          >
            <MenuItem
              disabled={areTypesDisabled.isOneLineDisabled}
              value={answerTypes.oneLineString}
            >
              One line string
            </MenuItem>
            <MenuItem
              disabled={areTypesDisabled.isMultilineDisabled}
              value={answerTypes.multilineString}
            >
              Multiline string
            </MenuItem>
            <MenuItem
              disabled={areTypesDisabled.isNumberDisabled}
              value={answerTypes.number}
            >
              Number
            </MenuItem>
            <MenuItem
              disabled={areTypesDisabled.isCheckboxDisabled}
              value={answerTypes.checkbox}
            >
              Checkbox
            </MenuItem>
          </Select>
        </Stack>
      </Stack>
      <AnswerConstructor
        title={title}
        type={localAnswerType}
        isDisabled={true}
        isRequired={isRequired}
      />
      <FormGroup>
        <FormControlLabel
          checked={isRequired}
          control={<Checkbox />}
          onChange={(_, checked) => {
            handleChange(question.id, "isRequired", checked);
          }}
          label="Is question required"
        />
        <FormControlLabel
          required
          checked={isShown}
          control={<Checkbox />}
          onChange={(_, checked) => {
            handleChange(question.id, "isShown", checked);
          }}
          label="Show question in form"
        />
      </FormGroup>
    </Stack>
  );
};
