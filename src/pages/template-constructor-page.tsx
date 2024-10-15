import { ChangeEvent, useEffect, useState, type JSX } from "react";

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
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

const TemplateConstructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();

  // TODO get topics from db
  // TODO add 2 predefined fields - user, date
  // TODO add img upload input
  // TODO add access setting (public/ particular user(s))

  const {
    templateState,
    handleTemplateFieldChange,
    handleQuestionFieldChange,
    addQuestionToTemplateState,
    removeQuestionFromTemplateState,
  } = useTemplateContext();

  const [topics, setTopics] = useState<AllTopicsType>([]);
  useEffect(() => {
    getTopics().then(
      (data) => setTopics(data),
      () => {},
    );
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Stack sx={{ padding: "2% 0" }}>
          <Typography component="h1" mb={1} textAlign="center" variant="h5">
            Template constructor
          </Typography>
          <Stack gap={1} width="60%" margin="0 auto">
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
              <InputLabel id="select-topic-label">Topic</InputLabel>
              <Select
                labelId="select-topic-label"
                id="topic-select"
                value={"topic 1"}
                label="Topic"
                onChange={(e) =>
                  handleTemplateFieldChange("topicId", e.target.value)
                }
              >
                {topics.length > 0 &&
                  topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.name}>
                      {topic.name}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
            <Button
              disabled={templateState.questions.length >= 16}
              onClick={addQuestionToTemplateState}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Stack sx={{ gap: 2 }} className="user-questions">
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
