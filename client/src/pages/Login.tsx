import LoginForm from "../components/LoginForm";

export default function Login({ lightMode }: { lightMode: boolean }) {
  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        lightMode ? "bg-light-background-color" : "bg-dark-background-color"
      } transition-colors`}
    >
      <LoginForm lightMode={lightMode} />
    </div>
  );
}
