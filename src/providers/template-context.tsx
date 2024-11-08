import {
  TemplateContext,
  type TemplateContextType,
} from "@/providers/template-provider";
import { useContext } from "react";

export const useTemplateContext = (): TemplateContextType => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateProvider",
    );
  }
  return context;
};
