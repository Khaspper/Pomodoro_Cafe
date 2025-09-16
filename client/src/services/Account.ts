export async function updateUser(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const response = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });
  return response;
}
