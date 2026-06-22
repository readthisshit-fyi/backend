export interface Website {
  WID: number;
  websiteTitle: string;
  websiteDesc: string;
  websiteURL: string;
  websiteCategory: string;
  rating: number;
  fishCount: number;
  images: string[];
}

export interface Review {
  UID: number;
  WID: number;
  body: string;
  rating: number;
}

export interface User {
  UID: number;
  email: string;
  nickname: string;
}
