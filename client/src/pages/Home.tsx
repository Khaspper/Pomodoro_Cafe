import MyMap from "../components/MyMap";

type THomeProps = { children: React.ReactNode };

export default function Home({ children }: THomeProps) {
  return (
    <div className="relative">
      <div className="absolute z-1 w-screen">{children}</div>
      <MyMap />
    </div>
  );
}
