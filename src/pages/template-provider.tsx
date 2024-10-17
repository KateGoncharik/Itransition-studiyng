import { answerTypes } from "@/components/constructor/answer/types";
import { getAuthorizedUser } from "@/requests/get-authorized-user";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultImage } from "./template-constructor-page";
import { convertFileToBase64 } from "./convert-file-to-base64";

type QuestionType = {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isShown: boolean;
  answerType: string;
};

export type TemplateState = {
  title: string;
  description: string;
  imageUrl: string;
  topicId: string;
  userId: number | null;
  questions: Array<QuestionType>;
};

export type TemplateFieldChangeHandler = (
  field: keyof TemplateState,
  value: string | boolean,
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
    title: "",
    description: "",
    imageUrl: "",
    topicId: "",
    userId: null,
    questions: [],
  };
  const [templateState, setTemplateState] =
    useState<TemplateState>(initialTemplateState);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const user = await getAuthorizedUser();
      setTemplateState((prevState) => ({
        ...prevState,
        userId: user.id,
      }));
    };

    void fetchUserData();
    const formatDefaultImage = (): void => {
      convertFileToBase64(defaultImage).then(
        (base64String) => {
          setTemplateState((prevState) => ({
            ...prevState,
            imageUrl: base64String,
          }));
        },
        () => {},
      );
    };
    void formatDefaultImage();
  }, []);

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
    value: string | boolean,
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
