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
  showData: number;
  setShowData: React.Dispatch<React.SetStateAction<number>>;
};

export type TCafeData = {
  cafeId: number;
  wifiCount: number;
  outletCount: number;
  seatingCount: number;
  freeWifi: boolean;
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
  comment?: string;
  freeWifi?: string;
  seating?: string;
  outlets?: string;
  wifiStrength?: string;
};

export type TCommentProps = {
  username: string;
  comment: string;
  createdAt: Date;
};

export type TComment = {
  id: number;
  cafeId: number;
  userId: number;
  username: string;
  message: string;
  createdAt: string;
};

export type TUserInfo = {
  id: number;
  email: string;
  username: string;
};
