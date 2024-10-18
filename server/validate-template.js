const { clientAnswerTypes } = require("./constants");

const isTemplateValid = (templateState) => {
  console.log(templateState);
  const parsedQuestions = JSON.parse(templateState.questions);
  if (
    !templateState.title ||
    !templateState.description ||
    templateState.userId === null ||
    templateState.topicId === null ||
    !templateState.image
  ) {
    console.log("1");
    return false;
  }
  if (parsedQuestions.length === 0) {
    console.log("2");

    return false;
  }
  if (parsedQuestions) {
    const getQuestionCountByType = (type) => {
      return parsedQuestions.filter((question) => question.answerType === type)
        .length;
    };
    if (
      getQuestionCountByType(clientAnswerTypes.oneLineString).length > 4 ||
      getQuestionCountByType(clientAnswerTypes.multilineString).length > 4 ||
      getQuestionCountByType(clientAnswerTypes.number).length > 4 ||
      getQuestionCountByType(clientAnswerTypes.checkbox).length > 4
    ) {
      console.log("3");

      return false;
    }
  }
  return true;
};

module.exports = { isTemplateValid };
