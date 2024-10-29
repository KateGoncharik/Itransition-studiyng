import { getTemplateById } from "@/requests/get-template-by-id";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoredTemplateType } from "@/requests/template-state-schema";
import { AnswerConstructor } from "./constructor/answer/answer-constructor";
import { useAuth } from "@/hooks/use-auth";
import { getAuthorizedUser } from "@/requests/get-authorized-user";
import { UserType } from "@/requests/user-schema";
import { answerTypes } from "./constructor/answer/types";

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const FormComponent: FC = () => {
  const [template, setTemplate] = useState<null | StoredTemplateType>(null);
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<null | UserType>(null);
  const [currentDate, setCurrentDate] = useState("");

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

  const validateAnswers = (): boolean => {
    return false;
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
          if (!validateAnswers()) {
            return;
          }
        }}
        encType="multipart/form-data"
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
                    isDisabled={!isAuthenticated}
                    onChange={() => {
                      //TODO set values to form state
                    }}
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
    <>No template data</>
  );
};
