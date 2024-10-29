import { FC, ChangeEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

const numberInputStyles = {
  "& input": {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
  width: "200px",
};

export const NumberInputComponent: FC<{
  label: string;
  isDisabled: boolean;
  isRequired: boolean;
}> = ({ label, isRequired, isDisabled }) => {
  const [numberValue, setNumberValue] = useState<number | null>(0);
  const minValue = 0;
  const maxValue = 9999;

  const handleInputChange = (
    _: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: number | null,
  ): void => {
    if (value === null) {
      return;
    }

    if (isNaN(value)) {
      setNumberValue(null);
    } else if (value >= minValue && value <= maxValue) {
      setNumberValue(value);
    } else if (value < minValue) {
      setNumberValue(minValue);
    } else {
      setNumberValue(maxValue);
    }
  };

  const handleIncrement = (): void => {
    setNumberValue((prev) =>
      prev !== null && prev < maxValue ? prev + 1 : maxValue,
    );
  };

  const handleDecrement = (): void => {
    setNumberValue((prev) =>
      prev !== null && prev > minValue ? prev - 1 : minValue,
    );
  };

  return (
    <Stack gap={2} flexDirection="row" alignItems="center">
      <TextField
        label={label}
        type="number"
        disabled={isDisabled}
        required={isRequired}
        value={numberValue || ""}
        onChange={(e) => handleInputChange(e, parseInt(e.target.value))}
        sx={numberInputStyles}
        slotProps={{
          htmlInput: {
            min: minValue,
            max: maxValue,
          },
        }}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          disabled={isDisabled}
          type="button"
          onClick={handleDecrement}
        >
          -
        </Button>
        <Button
          variant="contained"
          disabled={isDisabled}
          type="button"
          onClick={handleIncrement}
        >
          +
        </Button>
      </Stack>
    </Stack>
  );
};
