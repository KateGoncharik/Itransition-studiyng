import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TemplateFieldChangeHandler } from "@/pages/template-provider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const InputFileUpload: FC<{
  setUploadError: (error: string | null) => void;
  setFile: (file: string) => void;
  handleTemplateFieldChange: TemplateFieldChangeHandler;
}> = ({ setFile, setUploadError, handleTemplateFieldChange }) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setUploadError("Only image files (JPEG, PNG, GIF) are allowed.");
        return;
      }

      const maxSizeInMB = 2;
      if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        setUploadError(`File size exceeds ${maxSizeInMB}MB limit.`);
        return;
      }

      const fileURL = URL.createObjectURL(selectedFile);
      setFile(fileURL);
      // TODO fix this to file
      handleTemplateFieldChange("image", selectedFile);

      setUploadError(null);
    }
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload img
      <VisuallyHiddenInput
        type="file"
        accept="image/jpeg, image/png, image/gif"
        multiple={false}
        onChange={handleFileChange}
      />
    </Button>
  );
};
