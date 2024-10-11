import { useState, type JSX } from "react";

import { getAuthorizedUser } from "../requests/get-authorized-user";
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

const TemplateConstructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    void getAuthorizedUser().then((data) => console.log(data));
  }
  // TODO topic - new values to this list are added through the database; there is no need for the UI
  // TODO add 2 predefined fields - user, date
  // TODO add img upload input
  // TODO add access setting (public/ particular user(s))

  const [questions, setQuestions] = useState<JSX.Element[]>([]);
  const handleAddQuestion = (): void => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      <QuestionConstructor key={prevQuestions.length} />,
    ]);
  };
  const handleRemoveQuestion = (index: number): void => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index),
    );
  };

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
                placeholder="Nice title"
                isRequired={true}
              />
              <StyledTextarea
                name={"template-description"}
                placeholder="Description of template"
                required={true}
              />
              <InputLabel id="select-topic-label">Topic</InputLabel>
              <Select
                labelId="select-topic-label"
                id="topic-select"
                value={"topic 1"}
                label="Topic"
                onChange={() => {}}
              >
                <MenuItem value={"topic 1"}>topic 1</MenuItem>
                <MenuItem value={"topic 2"}>topic 2</MenuItem>
                <MenuItem value={"topic 3"}>topic 3</MenuItem>
              </Select>
            </Stack>
            <Button onClick={handleAddQuestion}>
              <AddCircleOutlineIcon />
            </Button>
            <Stack sx={{ gap: 2 }} className="user-questions">
              {questions.map((question, index) => (
                <Stack
                  sx={{
                    borderLeft: "5px solid #2da2ff",
                    borderRadius: "4px",
                    backgroundColor: "background.paper",
                  }}
                  key={index}
                >
                  {question}
                  <Button onClick={() => handleRemoveQuestion(index)}>
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
