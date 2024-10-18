import { ChangeEvent, useEffect, useState, type JSX } from "react";

import { Button, Stack, Typography } from "@mui/material";

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
export const defaultImage = "./template-placeholder.jpg";
const TemplateConstructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();

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
      setFormError("Title is required");
      return false;
    }
    if (templateState.userId === null || templateState.topicId === null) {
      setFormError("Topic or user id is not present");
      return false;
    }
    if (!templateState.description) {
      setFormError("Description is required");
      return false;
    }
    if (templateState.questions.length === 0) {
      setFormError("At least one question is required");
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

    void submitTemplate(formData);
  };

  // TODO move file input logic to its component
  const handleFileRemove = (): void => {
    setFile(defaultImage);
  };

  return (
    <>
      {isAuthenticated ? (
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
        </Stack>
      ) : (
        <Typography
          component="h1"
          mb={4}
          mt={7}
          textAlign="center"
          variant="h3"
        >
          Log in to view this page
        </Typography>
      )}
    </>
  );
};
export default TemplateConstructor;
