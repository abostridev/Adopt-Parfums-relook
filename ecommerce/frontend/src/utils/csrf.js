export const getCsrfToken = () => {
  const match = document.cookie.match(/csrfToken=([^;]+)/);
  return match ? match[1] : null;
};
