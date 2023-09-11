export interface IIcon {
  fillDefault?: string;
  strokeDefault?: string;
  fillHovered?: string;
  strokeHovered?: string;
}

export type TPost = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type TUser = {
  address: { city: string };
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};