import { getTemplateById } from "@/requests/get-template-by-id";
import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CustomQuestionType,
  CustomTemplateType,
} from "@/requests/template-state-schema";
import { AnswerConstructor } from "../components/constructor/answer/answer-constructor";
import { useAuth } from "@/hooks/use-auth";
import { getAuthorizedUser } from "@/requests/get-authorized-user";
import { UserType } from "@/requests/user-schema";
import { answerTypes } from "../components/constructor/answer/types";
import { submitForm } from "@/requests/submit-form";
import {
  AnswerValueType,
  AnswersInForm,
  StoredFormType,
} from "@/requests/form-schema";
import { getFormById } from "@/requests/get-form-by-id";
import { getCurrentDate } from "./get-current-date";
import { isUserAuthorized } from "@/requests/check-if-user-authorized";

const getCheckboxValue = (
  value: number | null | undefined,
): boolean | string => {
  if (value === null || value === undefined) {
    return "";
  }
  if (value === 0) {
    return false;
  }
  if (value === 1) {
    return true;
  }
  throw new Error("Checkbox value is invalid");
};

const getInitAnswersState = (form: StoredFormType | null): AnswersInForm => {
  return {
    custom_string1: form?.custom_string1 ?? "",
    custom_string2: form?.custom_string2 ?? "",
    custom_string3: form?.custom_string3 ?? "",
    custom_string4: form?.custom_string4 ?? "",
    custom_text1: form?.custom_text1 ?? "",
    custom_text2: form?.custom_text2 ?? "",
    custom_text3: form?.custom_text3 ?? "",
    custom_text4: form?.custom_text4 ?? "",
    custom_int1: form?.custom_int1 ?? "",
    custom_int2: form?.custom_int2 ?? "",
    custom_int3: form?.custom_int3 ?? "",
    custom_int4: form?.custom_int4 ?? "",
    custom_checkbox1: getCheckboxValue(form?.custom_checkbox1),
    custom_checkbox2: getCheckboxValue(form?.custom_checkbox2),
    custom_checkbox3: getCheckboxValue(form?.custom_checkbox3),
    custom_checkbox4: getCheckboxValue(form?.custom_checkbox4),
  };
};

const isAnswerKey = (key: string): key is keyof AnswersInForm => {
  return key in getInitAnswersState(null);
};

export const FormComponent: FC<{ route: "template" | "form" }> = ({
  route,
}) => {
  const [template, setTemplate] = useState<null | CustomTemplateType>(null);

  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, logout } = useAuth();

  const [user, setUser] = useState<null | UserType>(null);

  // TODO fix - we need to store date of submission - now it's always current
  const [currentDate, setCurrentDate] = useState("");
  const [form, setForm] = useState<null | StoredFormType>(null);

  const [answers, setAnswers] = useState<AnswersInForm>(
    getInitAnswersState(form),
  );
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
    if (route === "template") {
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
    }
    if (route === "form") {
      const fetchUserData = async (): Promise<void> => {
        const authorized = await isUserAuthorized();
        if (authorized === "Token expired") {
          logout();
          throw new Error("Token expired");
        }
        if (authorized === "No token provided") {
          logout();
          throw new Error("No token provided");
        }
        if (typeof authorized === "string") {
          return;
        }
        setUser(authorized);
      };
      void fetchUserData();

      // if (isAuthenticated) {
      //   void getAuthorizedUser().then((data) => {
      //     setUser(data);
      //   });
      // }
      if (!id) {
        return;
      }

      const getFormAndTemplate = async (): Promise<void> => {
        const form = await getFormById(+id);
        setForm(form);
        setAnswers(getInitAnswersState(form));

        getTemplateById(form.template_id).then(
          (data) => {
            setTemplate(data);
          },
          () => {},
        );
      };
      void getFormAndTemplate();
    }
  }, [id, isAuthenticated, route, logout]);

  const validateAnswers = (answers: AnswersInForm): boolean => {
    if (Object.values(answers).every((answerValue) => answerValue === "")) {
      // TODO handle case with all empty answers
      setSnackbarMessage("All required questions should be answered");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleAnswer = (nameInDb: string, value: AnswerValueType): void => {
    if (nameInDb in answers) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [nameInDb]: value,
      }));
    }
  };

  const getValueForAnswer = (question: CustomQuestionType): AnswerValueType => {
    if (isAnswerKey(question.nameInDb)) {
      return answers[question.nameInDb];
    }
    throw new Error("Invalid answer type");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // TODO move to a handler
    e.preventDefault();

    if (!validateAnswers(answers)) {
      return;
    }

    const result = {
      userId: user?.id,
      date: currentDate,
      templateId: template?.id,
      answers,
    };

    const formData = new FormData();
    formData.append("userId", JSON.stringify(result.userId));
    formData.append("date", result.date);
    formData.append("templateId", JSON.stringify(result.templateId));
    formData.append("answers", JSON.stringify(result.answers));

    submitForm(formData)
      .then(() => {
        setSnackbarMessage("Your answer was successfully saved!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2000);
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

  return template ? (
    <Stack
      sx={{
        display: "flex",
        margin: "1% auto 3% ",
        alignItems: "center",
        width: { lg: "50%", md: "70%", sm: "85%", xs: "90%" },
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

      <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
        <Stack width="100%" gap={2}>
          <Typography
            component="h1"
            sx={{
              fontSize: { lg: "28px", md: "24px", sm: "18px", xs: "14px" },
            }}
            textAlign="center"
          >
            {route === "template"
              ? template.title
              : `Your answer for the "${template.title}" template`}
          </Typography>
          <Typography
            component="h5"
            color="info"
            sx={{
              fontSize: { lg: "20px", md: "16px", sm: "14px", xs: "10px" },
            }}
            textAlign="center"
          >
            {route === "form" && `The answer is available for viewing only`}
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
            <Typography>Date</Typography>
            <TextField
              type="date"
              value={route === "template" ? currentDate : form?.date}
              disabled={true}
            />

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
                    isDisabled={route === "template" ? !isAuthenticated : true}
                    onChange={handleAnswer}
                  />
                </Stack>
              );
            })}
          </Stack>

          <Button
            disabled={route === "template" ? !isAuthenticated : true}
            variant="contained"
            type="submit"
          >
            Submit
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
  ) : (
    // TODO make loader
    <>Preparing data...</>
  );
};
