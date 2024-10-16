import { ChangeEvent, useEffect, useState, type JSX } from "react";

import {
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Typography,
  FormGroup,
} from "@mui/material";

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

  const defaultImage = "./template-placeholder.jpg";
  const [file, setFile] = useState(defaultImage);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    getTopics().then(
      (data) => setTopics(data),
      () => {},
    );
  }, []);

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

              <FormGroup>
                <FormControlLabel
                  onChange={(_, checked) =>
                    handleTemplateFieldChange("isPublic", checked)
                  }
                  control={<Checkbox disabled={false} />}
                  label="Make public"
                />
              </FormGroup>
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
          </Stack>
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
