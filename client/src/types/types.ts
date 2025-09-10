export type TCafe = {
  brand: string | null;
  id: number;
  lat: GLfloat;
  lon: GLfloat;
  name: string;
  official_name: string | null;
  spotifyLink: string | null;
};

export type TSidebarContainer = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TCafeData = {
  id: number;
  cafeId: number;
  wifiStrength: number;
  freeWifi: boolean;
  outlets: number;
  seating: number;
  numberOfInputs: number;
};

export type TReceivedErrors = {
  location: string;
  msg: string;
  path: "username" | "email" | "password" | "confirmPassword";
  type: string;
  value: string;
};

export type TNewErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  spotifyLink?: string;
};
