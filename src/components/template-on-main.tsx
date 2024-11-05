import { TemplateData } from "@/pages/main-page";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

export const TemplateOnMain: FC<{ templates: Array<TemplateData> }> = ({
  templates,
}) => {
  return (
    <ImageList
      sx={{
        width: { lg: "50%", md: "70%", sm: "85%", xs: "95%" },
        height: "60vh",
        margin: "1% auto",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#2da2ff",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#3660ab",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ccc",
        },
      }}
    >
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            fontSize: "1em",
          }}
          component="div"
        >
          All templates
        </ListSubheader>
      </ImageListItem>
      {templates.map((template) => (
        <ImageListItem key={template.id}>
          <img
            srcSet={`${template.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${template.image_url}?w=248&fit=crop&auto=format`}
            alt={template.title}
            loading="lazy"
          />
          <Link to={`/templates/${template.id}`}>
            <ImageListItemBar
              sx={{
                height: { lg: "30%", md: "45%", sm: "60%", xs: "70%" },
                padding: "1%",
              }}
              title={template.title}
              subtitle={template.user_name}
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
