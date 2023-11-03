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
  averageStars: number;
  numReviews: number;
};

export type HostedListingsProps = {
  isLoggedIn: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ListingsReturn = {
  listings: Product[];
};

export type HomePageProps = {
  isLoggedIn: boolean;
};

export type ErrorModalsProps = {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
};

export type NavBarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export type HomeProfileMenuProps = {
  openLoginModal: () => void;
  openRegisterModal: () => void;
  isLoggedIn: boolean;
  handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
  navigateHostedListings: () => void;
};

export type RegisterModalProps = {
  open: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  openLoginModal: () => void;
  setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewToken: React.Dispatch<React.SetStateAction<string>>;
};

export type AuthReturn = {
  token: string;
};

export type LoginModalProps = {
  open: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  openRegisterModal: () => void;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewToken: React.Dispatch<React.SetStateAction<string>>;
};
