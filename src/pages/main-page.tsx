import { useEffect, useState, type JSX } from "react";

import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/use-auth";
import { getAllTemplates } from "@/requests/get-all-templates";
import { TemplatePreviewType } from "@/requests/templates-schema";
import { TemplateOnMain } from "@/components/template-on-main";
import { getUserById } from "@/requests/get-user-by-id";

export interface TemplateData extends TemplatePreviewType {
  user_name: string;
}
const Main = (): JSX.Element | undefined => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const { isAuthenticated } = useAuth();

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
    <Stack>
      {isAuthenticated ? (
        <Typography
          component="h1"
          mb={1}
          mt={3}
          textAlign="center"
          variant="h5"
        >
          Authorized user main page
        </Typography>
      ) : (
        <>
          <Typography
            component="h1"
            mb={4}
            mt={7}
            textAlign="center"
            variant="h4"
          >
            Not authorized user main page
          </Typography>
          <Typography component="h3" textAlign="center" variant="h5">
            Log in to create template
          </Typography>
        </>
      )}
      {templates.length > 0 ? (
        <TemplateOnMain templates={templates} />
      ) : (
        <Typography component="h4" textAlign="center" variant="h6">
          No templates created yet
        </Typography>
      )}
    </Stack>
  );
};
export default Main;
