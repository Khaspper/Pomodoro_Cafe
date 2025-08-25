export async function loginUser(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  return response;
}
