import { useContext } from "react";
import { TemplateContext, TemplateContextType } from "./template-provider";

export const useTemplateContext = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateProvider",
    );
  }
  return context;
};
