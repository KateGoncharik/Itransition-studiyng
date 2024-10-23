import { TemplateData } from "@/pages/main-page";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { FC } from "react";

export const TemplateOnMain: FC<{ templates: Array<TemplateData> }> = ({
  templates,
}) => {
  return (
    <ImageList sx={{ width: "70%", height: "60vh", margin: "1% auto" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">All templates</ListSubheader>
      </ImageListItem>
      {templates.map((template) => (
        <ImageListItem key={template.image_url}>
          <img
            srcSet={`${template.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${template.image_url}?w=248&fit=crop&auto=format`}
            alt={template.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={template.title}
            subtitle={template.user_name}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${template.title}`}
              >
                Fill
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
