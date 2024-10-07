import { getUrl } from "./get-url.ts";
// TODO call ot request not get

export const getAllUsers = (): void => {
  fetch(getUrl("users"))
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Сеть не отвечает");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Список пользователей:", data);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};
