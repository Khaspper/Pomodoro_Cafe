export async function logout(
  setUser: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await fetch("http://localhost:3000/account/logout", {
      method: "post",
      credentials: "include",
    });
    if (response.ok) {
      setUser(false);
    }
  } catch (error) {
    console.error("Could not log out (inside client)", error);
  }
}
