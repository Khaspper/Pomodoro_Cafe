export async function signupUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  const data = await response.json();
  return data.errors;
}
