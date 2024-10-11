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

const TemplateConstructor = (): JSX.Element | undefined => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    console.log(getAuthorizedUser());
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
        <>
          <Typography
            component="h1"
            mb={1}
            mt={3}
            textAlign="center"
            variant="h4"
          >
            Template constructor
          </Typography>
          <Stack width="60%" margin="0 auto">
            <Stack className="template-settings">
              <Question
                name={"template-title"}
                label="title of template"
                placeholder="Nice title for template"
                isRequired={true}
              />
              <Question
                name={"template-description"}
                label="description of template"
                placeholder="Nice description for template"
                isRequired={true}
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
            <Stack className="user-questions">
              {questions.map((question, index) => (
                <div key={index}>
                  {question}
                  <Button onClick={() => handleRemoveQuestion(index)}>
                    Remove question
                  </Button>
                </div>
              ))}
            </Stack>
          </Stack>
        </>
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
