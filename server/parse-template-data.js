const parseTemplateDataBack = (templateData) => {
  const parsedQuestions = [];

  const questionTypesMap = {
    string: "one-line-string",
    text: "multiline-string",
    int: "number",
    checkbox: "checkbox",
  };

  Object.keys(questionTypesMap).forEach((mappedAnswerType) => {
    let index = 1;

    while (templateData[`custom_${mappedAnswerType}${index}_id`]) {
      const question = {
        id: templateData[`custom_${mappedAnswerType}${index}_id`],
        title: templateData[`custom_${mappedAnswerType}${index}_question`],
        description:
          templateData[`custom_${mappedAnswerType}${index}_description`],
        isRequired:
          templateData[`custom_${mappedAnswerType}${index}_state`] ===
          "PRESENT_REQUIRED",
        isShown:
          templateData[`custom_${mappedAnswerType}${index}_isShown`] === "true",
        answerType: questionTypesMap[mappedAnswerType],
      };

      parsedQuestions.push(question);
      index++;
    }
  });

  return parsedQuestions;
};

module.exports = { parseTemplateDataBack };
