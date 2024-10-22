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
import { getTopics } from "@/requests/get-topics";
import { isUserAuthorized } from "@/requests/check-if-user-authorized";

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
  image: File | null;
  topicId: number | null;
  userId: number | null;
  questions: Array<QuestionType>;
};

export type TemplateFieldChangeHandler = (
  field: keyof TemplateState,
  value: string | number | boolean | File,
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

const convertUrlToFile = async (
  url: string,
  fileName: string,
  mimeType: string,
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: mimeType });
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
    image: null,
    topicId: null,
    userId: null,
    questions: [],
  };
  const [templateState, setTemplateState] =
    useState<TemplateState>(initialTemplateState);
  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const authorized = await isUserAuthorized();
      if (!authorized.isAuthorized) {
        return;
      }
      const user = await getAuthorizedUser();
      setTemplateState((prevState) => ({
        ...prevState,
        userId: user.id,
      }));
    };
    void fetchUserData();

    const handleSetDefaultImage = async (): Promise<void> => {
      const file = await convertUrlToFile(
        defaultImage,
        "template-placeholder.jpg",
        "image/png",
      );

      setTemplateState((prevState) => ({
        ...prevState,
        image: file,
      }));
    };
    void handleSetDefaultImage();
    const setInitialTopic = (): void => {
      getTopics().then(
        (data) =>
          setTemplateState((prevState) => ({
            ...prevState,
            topicId: data[0].id,
          })),
        () => {},
      );
    };

    void setInitialTopic();
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
    value: string | number | boolean | File,
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
