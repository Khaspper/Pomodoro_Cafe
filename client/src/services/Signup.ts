export async function signupUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  return response;
}
