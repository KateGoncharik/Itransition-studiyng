import { useEffect, useState, type JSX } from "react";

import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";
import { getAllTemplates } from "@/requests/get-all-templates";
import { TemplatePreviewType } from "@/requests/templates-schema";
import { TemplateOnMain } from "@/components/template-on-main";
import { getUserById } from "@/requests/get-user-by-id";
import Lottie from "react-lottie";
import animationData from "../lotties/Animation - 1729850510680.json";

export interface TemplateData extends TemplatePreviewType {
  user_name: string;
}
const Main = (): JSX.Element | undefined => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const { isAuthenticated } = useAuth();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    void getAllTemplates().then(async (data) => {
      const mapped = await Promise.all(
        data.map(async (templateData, index) => {
          const user = await getUserById(data[index].user_id);

          return { ...templateData, user_name: user.username };
        }),
      );

      setTemplates(mapped);
    });
  }, []);

  return (
    <Stack gap={2} textAlign="center">
      <Typography component="h1" mt={3} variant="h4">
        Welcome to Kate-forms!
      </Typography>

      <Typography
        sx={{ fontSize: { lg: "24px", md: "20px", sm: "18px", xs: "14px" } }}
      >
        Here you can browse quizzes created by others and create your own
        template.
      </Typography>

      <Lottie options={defaultOptions} height={300} width={300} />
      {!isAuthenticated && (
        <Typography component="h4" color="info" textAlign="center" variant="h5">
          Log in to create template
        </Typography>
      )}
      <Stack>
        {templates.length > 0 ? (
          <TemplateOnMain templates={templates} />
        ) : (
          <Typography component="h4" textAlign="center" variant="h6">
            No templates created yet..
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
export default Main;
