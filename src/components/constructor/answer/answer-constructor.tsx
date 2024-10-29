import { FC } from "react";
import { Question } from "../question/question";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";

import { answerTypes } from "./types";
import { StyledTextarea } from "../question/styled-textarea";

import { NumberInputComponent } from "./number-input";

export const AnswerConstructor: FC<{
  type: string;
  title: string;
  isDisabled: boolean;
  isRequired: boolean;
  value?: string;
  onChange?: (value: string | number | boolean) => void;
}> = ({ type, title, isDisabled, isRequired, value, onChange }) => {
  if (type === answerTypes.oneLineString) {
    return (
      <>
        {value && <Typography>{title}</Typography>}

        <Question
          name="one-line-string-answer"
          label={value ? "" : title}
          value={value}
          isRequired={isRequired}
          placeholder="Short answer"
          isDisabled={isDisabled}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      </>
    );
  }
  if (type === answerTypes.checkbox) {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              required={isRequired}
              disabled={isDisabled}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
            />
          }
          label={title}
        />
      </FormGroup>
    );
  }
  if (type === answerTypes.number) {
    return (
      <NumberInputComponent
        isDisabled={isDisabled}
        label={title}
        isRequired={isRequired}
        onChangeHandler={onChange}
      />
    );
  }
  if (type === answerTypes.multilineString) {
    return (
      <>
        <Stack>
          <Typography>{title}</Typography>
          {isRequired && "*"}
        </Stack>

        <StyledTextarea
          style={{
            maxWidth: "100%",
            minWidth: "50%",
            maxHeight: "300px",
            minHeight: "40px",
          }}
          required={isRequired}
          disabled={isDisabled}
          placeholder={"Full answer...\n"}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      </>
    );
  }
};
