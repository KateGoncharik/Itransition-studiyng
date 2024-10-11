import { FC } from "react";
import { Question } from "../question/question";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextareaAutosize,
} from "@mui/material";

import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/material/styles";
import { answerTypes } from "./types";

export const AnswerConstructor: FC<{ type: string }> = ({ type }) => {
  // TODO handle answer type change
  // TODO count answer types

  // TODO styles for answer inputs
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
        <FormControlLabel control={<Checkbox disabled={true} />} label="TBD" />
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
    return (
      <TextareaAutosize disabled={true} placeholder={"Full answer...\n"} />
    );
  }
};

const StyledNumberInput = styled(BaseNumberInput)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  .input {
    font-size: 16px;
    color: #333;
    border: none;
    outline: none;
    flex: 1;
  }

  .btn {
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .btn.decrement {
    margin-right: 4px;
  }

  .btn.increment {
    margin-left: 4px;
  }
`;
