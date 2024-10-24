import { styled, TextareaAutosize } from "@mui/material";

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    borderColor: theme.palette.text.primary,
  },
  "::placeholder": {
    color: theme.palette.text.secondary,
  },

  "&:disabled": {
    border: `1px solid ${theme.palette.divider}`,
  },
}));
