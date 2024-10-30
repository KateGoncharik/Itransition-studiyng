import { getTemplateById } from "@/requests/get-template-by-id";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CustomQuestionType,
  CustomTemplateType,
} from "@/requests/template-state-schema";
import { AnswerConstructor } from "./constructor/answer/answer-constructor";
import { useAuth } from "@/hooks/use-auth";
import { getAuthorizedUser } from "@/requests/get-authorized-user";
import { UserType } from "@/requests/user-schema";
import { answerTypes } from "./constructor/answer/types";
import { submitForm } from "@/requests/submit-form";

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export type Answer = string | number | boolean;
type Answers = {
  string1: string;
  string2: string;
  string3: string;
  string4: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  int1: number | string;
  int2: number | string;
  int3: number | string;
  int4: number | string;
  checkbox1: boolean | string;
  checkbox2: boolean | string;
  checkbox3: boolean | string;
  checkbox4: boolean | string;
};

const initAnswersState = {
  string1: "",
  string2: "",
  string3: "",
  string4: "",
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  int1: "",
  int2: "",
  int3: "",
  int4: "",
  checkbox1: "",
  checkbox2: "",
  checkbox3: "",
  checkbox4: "",
};

const isAnswerKey = (key: string): key is keyof Answers => {
  return key in initAnswersState;
};

export const FormComponent: FC = () => {
  const [template, setTemplate] = useState<null | CustomTemplateType>(null);
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<null | UserType>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [answers, setAnswers] = useState<Answers>(initAnswersState);
  useEffect(() => {
    if (isAuthenticated) {
      void getAuthorizedUser().then((data) => {
        setUser(data);
      });
    }
    if (!id) {
      return;
    }
    setCurrentDate(getCurrentDate());
    getTemplateById(+id).then(
      (data) => {
        setTemplate(data);
      },
      () => {},
    );
  }, [id, isAuthenticated]);

  const validateAnswers = (answers: Answers): boolean => {
    if (Object.values(answers).every((answerValue) => answerValue === "")) {
      return false;
    }
    return true;
  };

  const handleAnswer = (nameInDb: string, value: Answer): void => {
    if (nameInDb in answers) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [nameInDb]: value,
      }));
    }
  };

  const getValueForAnswer = (question: CustomQuestionType): Answer => {
    if (isAnswerKey(question.nameInDb)) {
      return answers[question.nameInDb];
    }
    throw new Error("Invalid answer type");
  };
  return template ? (
    <Stack
      sx={{
        display: "flex",
        margin: "1% auto 3% ",
        alignItems: "center",
        width: "50%",
      }}
    >
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
          src={template.image_url}
          alt="template illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO get template id from params
          // TODO get user id from state
          // collect answers
          console.log(answers);
          if (!validateAnswers(answers)) {
            return;
          }

          const result = { userId: user?.id, templateId: template.id, answers };

          const formData = new FormData();
          formData.append("userId", JSON.stringify(result.userId));
          formData.append("templateId", JSON.stringify(result.templateId));
          formData.append("answers", JSON.stringify(result.answers));

          submitForm(formData)
            .then(() => {
              console.log("success");
              // setSnackbarMessage("Template successfully created!");
              // setSnackbarSeverity("success");
              // setOpenSnackbar(true);
              // setTimeout(() => navigate("/"), 1000);
            })
            .catch((error: unknown) => {
              console.error("Error:", error);
              // const errorMessage =
              // error instanceof Error ? error.message : "Unknown error";
              // setSnackbarMessage(errorMessage);
              // setSnackbarSeverity("error");
              // setOpenSnackbar(true);
            });
        }}
      >
        <Stack width="100%" gap={2}>
          <Typography component="h1" variant="h4" textAlign="center">
            {template.title}
          </Typography>
          <Typography>{template.description}</Typography>
          {!isAuthenticated && (
            <Typography
              color="warning"
              component="h3"
              variant="h5"
              textAlign="center"
            >
              Log in to fill the form
            </Typography>
          )}
          <Stack sx={{ gap: 1 }}>
            <AnswerConstructor
              type={answerTypes.oneLineString}
              title="User"
              value={user?.username}
              isDisabled={true}
              isRequired={false}
            />
            <TextField type="date" value={currentDate} disabled={true} />

            {template.questions.map((question) => {
              return (
                <Stack
                  sx={{
                    borderRadius: "4px",
                    padding: "2%",
                    backgroundColor: "background.paper",
                  }}
                  key={question.id}
                >
                  <Typography>{question.description}</Typography>

                  <AnswerConstructor
                    isRequired={question.isRequired}
                    key={question.id}
                    type={question.answerType}
                    title={question.title}
                    value={getValueForAnswer(question)}
                    nameInDb={question.nameInDb}
                    isDisabled={!isAuthenticated}
                    onChange={handleAnswer}
                  />
                </Stack>
              );
            })}
          </Stack>

          <Button disabled={!isAuthenticated} variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  ) : (
    // TODO make loader
    <>Preparing data...</>
  );
};
