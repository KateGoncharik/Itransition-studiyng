const { clientAnswerTypes } = require("./constants");

const isTemplateValid = (templateState) => {
  const parsedQuestions = JSON.parse(templateState.questions);
  if (
    !templateState.title ||
    !templateState.description ||
    templateState.userId === null ||
    templateState.topicId === null ||
    !templateState.image
  ) {
    return false;
  }
  if (parsedQuestions.length === 0) {
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
      return false;
    }
  }
  return true;
};

module.exports = { isTemplateValid };
