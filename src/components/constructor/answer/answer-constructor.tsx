import { FC } from "react";
import { Question } from "../question/question";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

import { answerTypes } from "./types";
import { StyledTextarea } from "../question/styled-textarea";
import { StyledNumberInput } from "./styled-number-input";

export const AnswerConstructor: FC<{
  type: string;
  title: string;
  isDisabled: boolean;
  isRequired: boolean;
}> = ({ type, title, isDisabled, isRequired }) => {
  if (type === answerTypes.oneLineString) {
    return (
      <>
        <Typography>{title}</Typography>

        <Question
          name="one-line-string-answer"
          label=""
          isRequired={isRequired}
          placeholder="Short answer"
          isDisabled={isDisabled}
        />
      </>
    );
  }
  if (type === answerTypes.checkbox) {
    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox required={isRequired} disabled={isDisabled} />}
          label={title}
        />
      </FormGroup>
    );
  }
  if (type === answerTypes.number) {
    return (
      <>
        <Typography>{title}</Typography>

        <StyledNumberInput
          min={0}
          max={9999}
          required={isRequired}
          slotProps={{
            root: { className: "CustomNumberInput" },
            input: { className: "input" },
            decrementButton: {
              className: "btn decrement",
              children: "▾",
              type: "button",
            },
            incrementButton: {
              className: "btn increment",
              children: "▴",
              type: "button",
            },
          }}
          aria-label="Number input"
          placeholder="Type a number…"
          disabled={isDisabled}
        />
      </>
    );
  }
  if (type === answerTypes.multilineString) {
    return (
      <>
        <Typography>{title}</Typography>
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
        />
      </>
    );
  }
};
