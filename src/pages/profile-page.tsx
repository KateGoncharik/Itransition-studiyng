import { useEffect, useState, type JSX } from "react";

import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuth } from "@/hooks/use-auth";

import { Link } from "react-router-dom";
import { User } from "@/components/user";
import { getAllUserForms } from "@/requests/get-all-user-forms";
import { StoredFormType } from "@/requests/form-schema";
import { checkToken } from "@/providers/check-token";
import { getTemplateById } from "@/requests/get-template-by-id";
import { StoredTemplateType } from "@/requests/template-state-schema";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRedirectWithDelay } from "@/router/redirect";

const Profile = (): JSX.Element | undefined => {
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState<null | User>(null);
  const [forms, setForms] = useState<Array<StoredFormType>>([]);
  const [templates, setTemplates] = useState<Array<StoredTemplateType>>([]);
  const redirect = useRedirectWithDelay();
  useEffect(() => {
    const getUserAndHisForms = async (): Promise<void> => {
      if (!isAuthenticated) {
        redirect("/", 0);
        return;
      }
      const authorized = await checkToken(logout);

      const forms = await getAllUserForms(authorized.id);
      // TODO handle no forms case
      const templates = forms.map((form) => {
        return getTemplateById(form.template_id);
      });
      void Promise.all(templates).then((result) => setTemplates(result));

      setForms(forms);
      setUser(authorized);
    };
    void getUserAndHisForms();
  }, [isAuthenticated, redirect, logout]);

  return (
    <Stack gap={2} textAlign="center">
      <Typography component="h1" mt={3} variant="h4">
        Profile of {user?.username}
      </Typography>

      {forms && (
        <>
          <Typography component="h1" mt={3} variant="h4">
            Forms, that you filled out:
          </Typography>
          <TableContainer
            sx={{
              width: { lg: "60%", md: "75%", sm: "85%", xs: "95%" },
              margin: "1% auto",
            }}
          >
            <Table aria-label="filled-out-forms-table">
              <TableHead>
                <TableRow>
                  <TableCell>View form</TableCell>
                  <TableCell>Form id</TableCell>
                  <TableCell>Submission date</TableCell>
                  <TableCell>Template tile</TableCell>
                  <TableCell>Template img</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell>
                      <Link to={`/forms/${form.id}`}>
                        <Button>
                          <VisibilityIcon />
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography>{form.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{form.date}</Typography>
                    </TableCell>
                    {templates.length > 0 && (
                      <>
                        <TableCell>
                          <Typography>
                            {
                              templates.filter(
                                (template) => template.id === form.template_id,
                              )[0].title
                            }
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <div
                            style={{
                              width: "100%",
                              height: "80px",
                              overflow: "hidden",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              src={
                                templates.filter(
                                  (template) =>
                                    template.id === form.template_id,
                                )[0].image_url
                              }
                              alt="form-illustration"
                            />
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Stack>
  );
};
export default Profile;
