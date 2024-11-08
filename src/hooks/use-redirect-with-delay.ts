import { useNavigate } from "react-router-dom";

export const useRedirectWithDelay = (): ((
  whereToRedirect: string,
  delay: number,
) => void) => {
  const navigate = useNavigate();

  return (whereToRedirect: string, delay: number) => {
    setTimeout(() => navigate(whereToRedirect), delay);
  };
};
