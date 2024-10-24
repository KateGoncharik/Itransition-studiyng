import { styled } from "@mui/material";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";

export const StyledNumberInput = styled(BaseNumberInput)`
  border: 1px solid #ffffff1f;
  border-radius: 4px;
  padding: 1%;
  display: flex;
  align-items: center;
  .input {
    font-size: 16px;
    color: white;
    background-color: #153558;
    border: none;
    margin: 1%;
    flex: 1;
  }

  .btn {
    color: #fff;
    background-color: #21253c;
    border: none;
    border-radius: 4px;
    padding: 1% 2%;
    cursor: pointer;
  }

  .btn.decrement {
    margin-right: 4px;
  }

  .btn.increment {
    margin-left: 4px;
  }

  .btn:disabled:hover {
    cursor: auto;
  }
  .input::placeholder {
    color: #ccc;
  }
`;
