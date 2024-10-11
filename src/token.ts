function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}
export function isUserAuthorised(): boolean {
  return getCookie("token") !== undefined;
}

export function deleteToken(): void {
  document.cookie = "token=; path=/; max-age=0";
}
