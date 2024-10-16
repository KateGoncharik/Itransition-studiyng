import { answerTypes } from "@/components/constructor/answer/types";
import { createContext, useState, ReactNode, ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

type QuestionType = {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isShown: boolean;
  answerType: string;
};

type TemplateState = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  topicId: string;
  questions: Array<QuestionType>;
};

export type TemplateFieldChangeHandler = (
  field: keyof TemplateState,
  value: string,
) => void;

export type QuestionFieldChangeHandler = (
  id: string,
  field: keyof QuestionType,
  value: string | boolean,
) => void;

export type TemplateContextType = {
  templateState: TemplateState;
  handleTemplateFieldChange: TemplateFieldChangeHandler;
  handleQuestionFieldChange: QuestionFieldChangeHandler;
  addQuestionToTemplateState: () => void;
  removeQuestionFromTemplateState: (id: string) => void;
};

export const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined,
);

export const TemplateProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const initialTemplateState: TemplateState = {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    topicId: "",
    questions: [],
  };

  const [templateState, setTemplateState] =
    useState<TemplateState>(initialTemplateState);

  const getQuestionCountByType = (type: string): number => {
    return templateState.questions.filter(
      (question) => question.answerType === type,
    ).length;
  };

  const getAvailableAnswerType = (): string => {
    const maxCountPerType = 4;

    if (getQuestionCountByType(answerTypes.oneLineString) < maxCountPerType) {
      return answerTypes.oneLineString;
    }
    if (getQuestionCountByType(answerTypes.multilineString) < maxCountPerType) {
      return answerTypes.multilineString;
    }
    if (getQuestionCountByType(answerTypes.number) < maxCountPerType) {
      return answerTypes.number;
    }
    if (getQuestionCountByType(answerTypes.checkbox) < maxCountPerType) {
      return answerTypes.checkbox;
    }

    throw new Error("No available answer types. All limits reached.");
  };
  const handleTemplateFieldChange = (
    field: keyof TemplateState,
    value: string,
  ): void => {
    setTemplateState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleQuestionFieldChange = (
    id: string,
    field: keyof QuestionType,
    value: string | boolean,
  ): void => {
    setTemplateState((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question,
      ),
    }));
  };

  const addQuestionToTemplateState = (): void => {
    const newQuestion: QuestionType = {
      id: uuidv4(),
      title: "",
      description: "",
      isRequired: false,
      isShown: true,
      answerType: getAvailableAnswerType(),
    };
    setTemplateState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion],
    }));
  };

  const removeQuestionFromTemplateState = (id: string): void => {
    setTemplateState((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((question) => question.id !== id),
    }));
  };

  return (
    <TemplateContext.Provider
      value={{
        templateState,
        handleTemplateFieldChange,
        handleQuestionFieldChange,
        addQuestionToTemplateState,
        removeQuestionFromTemplateState,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
