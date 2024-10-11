export function deleteToken(): void {
  document.cookie = "token=; path=/; max-age=0";
}
