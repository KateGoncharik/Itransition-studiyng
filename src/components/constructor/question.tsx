import { TextField } from "@mui/material";
import { FC } from "react";
type QuestionConfig = {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  isDisabled?: boolean;
};
export const Question: FC<QuestionConfig> = ({
  label,
  name,
  placeholder,
  isRequired,
  isDisabled = false,
}: QuestionConfig) => {
  return (
    <>
      {isRequired ? (
        <TextField
          autoComplete={name}
          label={label}
          placeholder={placeholder}
          required
          size="small"
          name={name}
          disabled={isDisabled}
        />
      ) : (
        <TextField
          autoComplete={name}
          label={label}
          placeholder={placeholder}
          size="small"
          name={name}
          disabled={isDisabled}
        />
      )}
    </>
  );
};
