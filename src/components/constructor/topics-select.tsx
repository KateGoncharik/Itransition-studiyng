import { TemplateFieldChangeHandler } from "@/pages/template-provider";
import { AllTopicsType } from "@/requests/topic-schema";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";

export const TopicSelect: FC<{
  topics: AllTopicsType;
  handleTemplateFieldChange: TemplateFieldChangeHandler;
}> = ({ topics, handleTemplateFieldChange }) => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].name);
  return (
    <>
      <InputLabel id="select-topic-label">Topic</InputLabel>
      <Select
        labelId="select-topic-label"
        id="topic-select"
        value={selectedTopic}
        label="Topic"
        onChange={(e) => {
          setSelectedTopic(e.target.value);
          handleTemplateFieldChange("topicId", e.target.value);
        }}
      >
        {topics.length > 0 &&
          topics.map((topic) => (
            <MenuItem key={topic.id} value={topic.id}>
              {topic.name}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};
