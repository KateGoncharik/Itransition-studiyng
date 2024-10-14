import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";
type QuestionConfig = {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const Question: FC<QuestionConfig> = ({
  value,
  label,
  name,
  placeholder,
  isRequired,
  onChange,
  isDisabled = false,
}: QuestionConfig) => {
  return (
    <>
      {isRequired ? (
        <TextField
          value={value}
          autoComplete={name}
          label={label}
          placeholder={placeholder}
          required
          onChange={onChange}
          size="small"
          name={name}
          disabled={isDisabled}
        />
      ) : (
        <TextField
          value={value}
          autoComplete={name}
          label={label}
          placeholder={placeholder}
          size="small"
          onChange={onChange}
          name={name}
          disabled={isDisabled}
        />
      )}
    </>
  );
};
