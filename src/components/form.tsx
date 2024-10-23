import { getTemplateById } from "@/requests/get-template-by-id";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Question } from "./constructor/question/question";
import { StoredTemplateType } from "@/requests/template-state-schema";

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
    <Stack>
      <Typography>{template.id}</Typography>
      <Typography>{template.title}</Typography>
      <Typography>{template.description}</Typography>
      {template.questions.map((question) => {
        return (
          <Question
            key={question.id}
            label={question.title}
            name={question.title}
            placeholder="TBD"
            isRequired={question.isRequired}
          />
        );
      })}
    </Stack>
  ) : (
    <>No template data</>
  );
};
