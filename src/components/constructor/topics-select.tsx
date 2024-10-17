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
        required={true}
        label="Topic"
        onChange={(e) => {
          setSelectedTopic(e.target.value);
          const topic = topics.filter(
            (topic) => topic.name === e.target.value,
          )[0];
          handleTemplateFieldChange("topicId", topic.id);
        }}
      >
        {topics.length > 0 &&
          topics.map((topic) => (
            <MenuItem key={topic.id} value={topic.name}>
              {topic.name}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};
