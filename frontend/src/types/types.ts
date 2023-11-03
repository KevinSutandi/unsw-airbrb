export type RequestOptions = {
  token?: string;
  [key: string]: any;
};

export type Product = {
  id: number;
  title: string;
  owner: string;
  address: any;
  thumbnail: string;
  price: number;
  reviews: any[];
  color: string;
};

export type HostedListingsProps = {
  isLoggedIn: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
