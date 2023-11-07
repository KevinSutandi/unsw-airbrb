export type RequestOptions = {
  token?: string;
  [key: string]: unknown;
};

export type Review = {
  rating: number;
};

export type Availability = {
  from: string;
  to: string;
};

export type Product = {
  id: number;
  title: string;
  owner: string;
  address: unknown;
  thumbnail: string;
  price: number;
  reviews: Review[];
  averageStars: number;
  numReviews: number;
};

export type SingleDetailListing = {
  id: number;
  title: string;
  owner: string;
  address: unknown;
  price: number;
  thumbnail: string;
  metadata: {
    propertyType: string; // You can specify the data type of propertyType here
    amenities: string[]
    bedrooms: number
    beds: number
    bathrooms: number
    imageList: ImageData[]
  };
  reviews: Review[];
  availability: Availability[];
  published: boolean;
  postedOn: Date;
  averageStars: number;
  numReviews: number;
};

export type DetailListing = {
  listing: SingleDetailListing;
}

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

export interface TextFormProps {
  name: string;
  id: string;
  autoComplete?: string;
}

export interface NumberFormProps {
  name: string;
  id: string;
  min?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
