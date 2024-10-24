import { getTemplateById } from "@/requests/get-template-by-id";
import { Button, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoredTemplateType } from "@/requests/template-state-schema";
import { AnswerConstructor } from "./constructor/answer/answer-constructor";

export const FormComponent: FC = () => {
  const [template, setTemplate] = useState<null | StoredTemplateType>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) {
      return;
    }
    getTemplateById(+id).then(
      (data) => {
        setTemplate(data);
      },
      () => {},
    );
  }, [id]);
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
        }}
        encType="multipart/form-data"
      >
        <Stack width="100%" gap={2}>
          <Typography component="h1" variant="h4" textAlign="center">
            {template.title}
          </Typography>
          <Typography>{template.description}</Typography>
          <Stack sx={{ gap: 1 }}>
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
                  <AnswerConstructor
                    isRequired={question.isRequired}
                    key={question.id}
                    type={question.answerType}
                    title={question.title}
                    isDisabled={false}
                  />
                </Stack>
              );
            })}
          </Stack>

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  ) : (
    <>No template data</>
  );
};
