import { TextField } from "@mui/material";
import { FC } from "react";
type QuestionConfig = {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
};
export const Question: FC<QuestionConfig> = ({
  label,
  name,
  placeholder,
  isRequired,
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
        />
      ) : (
        <TextField
          autoComplete={name}
          label={label}
          placeholder={placeholder}
          size="small"
          name={name}
        />
      )}
    </>
  );
};
