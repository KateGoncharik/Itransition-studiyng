import { ChangeEvent, useEffect, useState, type JSX } from "react";

import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";

import { useAuth } from "@/hooks/use-auth";
import { Question } from "@/components/constructor/question/question";
import { QuestionConstructor } from "@/components/constructor/question/question-constructor";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { StyledTextarea } from "@/components/constructor/question/styled-textarea";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTemplateContext } from "./template-context";
import { getTopics } from "@/requests/get-topics";
import { AllTopicsType } from "@/requests/topic-schema";
import { TopicSelect } from "@/components/constructor/topics-select";
import { InputFileUpload } from "@/components/constructor/file-input";
import DeleteIcon from "@mui/icons-material/Delete";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { submitTemplate } from "@/requests/submit-template";
import { useNavigate } from "react-router-dom";
export const defaultImage = "./template-placeholder.jpg";
const TemplateConstructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error",
  );

  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // TODO DRY
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const {
    templateState,
    handleTemplateFieldChange,
    handleQuestionFieldChange,
    addQuestionToTemplateState,
    removeQuestionFromTemplateState,
  } = useTemplateContext();

  const [topics, setTopics] = useState<AllTopicsType>([]);

  const [file, setFile] = useState(defaultImage);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  useEffect(() => {
    getTopics().then(
      (data) => setTopics(data),
      () => {},
    );
  }, []);

  const validateForm = (): boolean => {
    if (!templateState.title) {
      setSnackbarMessage("Title is required");
      setOpenSnackbar(true);
      return false;
    }
    if (!templateState.description) {
      setSnackbarMessage("Description is required");
      setOpenSnackbar(true);
      return false;
    }
    if (templateState.questions.length === 0) {
      setSnackbarMessage("At least one question is required");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }
    // TODO remove?
    if (
      templateState.image === null ||
      templateState.userId === null ||
      templateState.topicId === null
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("title", templateState.title);
    formData.append("description", templateState.description);
    formData.append("topicId", JSON.stringify(templateState.topicId));
    formData.append("userId", JSON.stringify(templateState.userId));
    formData.append("questions", JSON.stringify(templateState.questions));
    formData.append("image", templateState.image);

    submitTemplate(formData)
      .then(() => {
        setSnackbarMessage("Template successfully created!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error: unknown) => {
        console.error("Error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  // TODO move file input logic to its component
  const handleFileRemove = (): void => {
    setFile(defaultImage);
  };

  return (
    <>
      {isAuthenticated && (
        <Stack sx={{ padding: "2% 0" }}>
          <Typography component="h1" mb={1} textAlign="center" variant="h5">
            Template constructor
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Stack gap={1} width="60%" margin="0 auto">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  src={file}
                  alt="Uploaded or default"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <Stack flexDirection="row" justifyContent="space-evenly">
                <InputFileUpload
                  handleTemplateFieldChange={handleTemplateFieldChange}
                  setUploadError={setUploadError}
                  setFile={setFile}
                />
                <Button
                  disabled={file === defaultImage}
                  onClick={handleFileRemove}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  style={{ marginTop: "10px" }}
                >
                  Reset img
                </Button>
              </Stack>

              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
              <Stack
                sx={{
                  backgroundColor: "background.paper",
                  gap: 1,
                  padding: "3% 1%",
                  borderRadius: "4px",
                  borderTop: "5px solid #2da2ff",
                }}
                className="template-settings"
              >
                <Question
                  name={"template-title"}
                  label="Title"
                  value={templateState.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (!e.target) {
                      throw new Error("Target expected");
                    }
                    if (typeof e.target.value === "string") {
                      handleTemplateFieldChange("title", e.target.value);
                    }
                  }}
                  placeholder="Nice title"
                  isRequired={true}
                />
                <StyledTextarea
                  name={"template-description"}
                  placeholder="Description of template"
                  required={true}
                  style={{
                    maxWidth: "100%",
                    minWidth: "50%",
                    maxHeight: "300px",
                    minHeight: "40px",
                  }}
                  onChange={(e) =>
                    handleTemplateFieldChange("description", e.target.value)
                  }
                />
                {topics.length > 0 && (
                  <TopicSelect
                    topics={topics}
                    handleTemplateFieldChange={handleTemplateFieldChange}
                  />
                )}
              </Stack>
              <Button
                disabled={templateState.questions.length >= 16}
                onClick={addQuestionToTemplateState}
              >
                <AddCircleOutlineIcon />
              </Button>
              <Stack sx={{ gap: 2 }} className="user-questions">
                <Question
                  name={"user-name"}
                  label="User"
                  placeholder=""
                  isDisabled={true}
                  isRequired={false}
                />
                <Question
                  name={"time"}
                  label="Time"
                  placeholder=""
                  isDisabled={true}
                  isRequired={false}
                />

                {templateState.questions.map((question, index) => (
                  <Stack
                    sx={{
                      borderLeft: "5px solid #2da2ff",
                      borderRadius: "4px",
                      backgroundColor: "background.paper",
                    }}
                    key={index}
                  >
                    <QuestionConstructor
                      handleChange={handleQuestionFieldChange}
                      question={question}
                    />
                    <Button
                      onClick={() => {
                        removeQuestionFromTemplateState(question.id);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </Stack>
                ))}
              </Stack>
              {formError && <p style={{ color: "red" }}>{formError}</p>}
              <Button
                disabled={
                  templateState.userId === null ||
                  templateState.topicId === null
                }
                variant="contained"
                type="submit"
                startIcon={<DoneOutlineIcon />}
                style={{ marginTop: "10px" }}
              >
                Submit template
              </Button>
            </Stack>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  );
};
export default TemplateConstructor;
