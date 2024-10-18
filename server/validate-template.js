const { clientAnswerTypes } = require("./constants");

const isTemplateValid = (templateState) => {
  if (
    !templateState.title ||
    !templateState.description ||
    templateState.userId === null ||
    templateState.topicId === null ||
    !templateState.imageUrl
  ) {
    return false;
  }
  if (templateState.questions.length === 0) {
    return false;
  }
  if (templateState.questions) {
    const getQuestionCountByType = (templateState, type) => {
      return templateState.questions.filter(
        (question) => question.answerType === type,
      ).length;
    };
    if (
      getQuestionCountByType(templateState, clientAnswerTypes.oneLineString)
        .length > 4 ||
      getQuestionCountByType(templateState, clientAnswerTypes.multilineString)
        .length > 4 ||
      getQuestionCountByType(templateState, clientAnswerTypes.number).length >
        4 ||
      getQuestionCountByType(templateState, clientAnswerTypes.checkbox).length >
        4
    ) {
      return false;
    }
  }
  return true;
};

module.exports = { isTemplateValid };
