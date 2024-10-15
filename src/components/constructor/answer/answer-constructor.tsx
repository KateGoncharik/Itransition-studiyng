import { FC } from "react";
import { Question } from "../question/question";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { answerTypes } from "./types";
import { StyledTextarea } from "../question/styled-textarea";
import { StyledNumberInput } from "./styled-number-input";

export const AnswerConstructor: FC<{ type: string; title: string }> = ({
  type,
  title,
}) => {
  if (type === answerTypes.oneLineString) {
    return (
      <Question
        name="one-line-string-answer"
        label=""
        isRequired={false}
        placeholder="Short answer"
        isDisabled={true}
      />
    );
  }
  if (type === answerTypes.checkbox) {
    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox disabled={true} />}
          label={title}
        />
      </FormGroup>
    );
  }
  if (type === answerTypes.number) {
    return (
      <StyledNumberInput
        min={0}
        max={9999}
        slotProps={{
          root: { className: "CustomNumberInput" },
          input: { className: "input" },
          decrementButton: { className: "btn decrement", children: "▾" },
          incrementButton: { className: "btn increment", children: "▴" },
        }}
        aria-label="Number input"
        placeholder="Type a number…"
        disabled={true}
      />
    );
  }
  if (type === answerTypes.multilineString) {
    return <StyledTextarea disabled={true} placeholder={"Full answer...\n"} />;
  }
};
