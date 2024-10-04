function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function getToken() {
  return getCookie('token');
}

function deleteToken() {
  document.cookie = 'token=; path=/; max-age=0';
}
