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
import { AnswerValueType } from "@/requests/form-schema";

export const AnswerConstructor: FC<{
  type: string;
  title: string;
  isDisabled: boolean;
  isRequired: boolean;
  value?: AnswerValueType;
  nameInDb?: string;
  onChange?: (nameInDb: string, value: string | number | boolean) => void;
}> = ({ type, title, isDisabled, isRequired, value, onChange, nameInDb }) => {
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
            if (onChange && nameInDb) {
              onChange(nameInDb, e.target.value);
            }
          }}
        />
      </>
    );
  }
  if (type === answerTypes.checkbox) {
    return (
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              required={isRequired}
              disabled={isDisabled}
              checked={typeof value === "boolean" ? value : false}
              onChange={(e) => {
                if (onChange && nameInDb) {
                  onChange(nameInDb, e.target.checked);
                }
              }}
            />
          }
          label={""}
        />
        <Typography>{title}</Typography>
      </FormGroup>
    );
  }
  if (type === answerTypes.number) {
    return (
      <NumberInputComponent
        isDisabled={isDisabled}
        label={title}
        value={typeof value === "number" ? value : undefined}
        nameInDb={nameInDb}
        isRequired={isRequired}
        onChangeHandler={onChange}
      />
    );
  }
  if (type === answerTypes.multilineString) {
    return (
      <>
        <Stack>
          <Typography>{isRequired ? `${title}*` : title}</Typography>
        </Stack>

        <StyledTextarea
          style={{
            maxWidth: "100%",
            minWidth: "50%",
            maxHeight: "300px",
            minHeight: "40px",
          }}
          required={isRequired}
          value={typeof value === "string" ? value : undefined}
          disabled={isDisabled}
          placeholder={"Full answer...\n"}
          onChange={(e) => {
            if (onChange && nameInDb) {
              onChange(nameInDb, e.target.value);
            }
          }}
        />
      </>
    );
  }
};
