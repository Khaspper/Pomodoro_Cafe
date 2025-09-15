import "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      username: string;
    }
  }
}

type OverpassElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags: {
    name?: string;
    brand?: string;
    official_name?: string;
    takeaway?: string;
  };
};

type OverpassResponse = {
  elements: OverpassElement[];
};
