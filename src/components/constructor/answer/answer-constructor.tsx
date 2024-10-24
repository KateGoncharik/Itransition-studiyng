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
import { StyledNumberInput } from "./styled-number-input";

export const AnswerConstructor: FC<{
  type: string;
  title: string;
  isDisabled: boolean;
  isRequired: boolean;
  value?: string;
}> = ({ type, title, isDisabled, isRequired, value }) => {
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
        <Stack flexDirection="row" gap={1}>
          <Typography>{title}</Typography>
          {isRequired && "*"}
        </Stack>

        <StyledNumberInput
          min={0}
          max={9999}
          title={title}
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
        />
      </>
    );
  }
};
