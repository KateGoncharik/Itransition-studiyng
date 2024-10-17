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
  return true;
};

module.exports = { isTemplateValid };
