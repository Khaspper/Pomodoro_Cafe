import MyMap from "../components/MyMap";

export default function Home({
  lightMode,
  setLightMode,
}: {
  lightMode: boolean;
  setLightMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return <MyMap lightMode={lightMode} setLightMode={setLightMode} />;
}
