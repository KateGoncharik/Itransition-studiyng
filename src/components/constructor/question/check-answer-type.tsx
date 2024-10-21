import { useTemplateContext } from "@/pages/template-context";
import { answerTypes } from "../answer/types";

type UseCheckAnswerTypeData = {
  areTypesDisabled: {
    isOneLineDisabled: boolean;
    isMultilineDisabled: boolean;
    isNumberDisabled: boolean;
    isCheckboxDisabled: boolean;
  };
};
// TODO move to template-constructor?
export const useCheckAnswerType = (): UseCheckAnswerTypeData => {
  const { templateState } = useTemplateContext();
  const maxTypeCount = 4;

  const getTypeCount = (type: string): number => {
    return templateState.questions.filter(
      (question) => question.answerType === type,
    ).length;
  };

  const areTypesDisabled = {
    isOneLineDisabled: getTypeCount(answerTypes.oneLineString) >= maxTypeCount,
    isMultilineDisabled:
      getTypeCount(answerTypes.multilineString) >= maxTypeCount,
    isNumberDisabled: getTypeCount(answerTypes.number) >= maxTypeCount,
    isCheckboxDisabled: getTypeCount(answerTypes.checkbox) >= maxTypeCount,
  };

  return {
    areTypesDisabled,
  };
};
