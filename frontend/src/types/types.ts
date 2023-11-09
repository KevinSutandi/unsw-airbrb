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
    amenities: string[];
    numBedrooms: number;
    beds: { [key: string]: string };
    numBathrooms: number;
    imageList: ImageData[];
  };
  reviews: Review[];
  availability: Availability[];
  published: boolean;
  postedOn: Date;
  averageStars: number;
  numReviews: number;
  totalBeds: number;
};

export type DetailListing = {
  listing: SingleDetailListing;
};

export type HostedListingsProps = {
  isLoggedIn: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreateListingProps = {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
  autoComplete?: string;
}

export interface NumberFormProps {
  name: string;
  id: string;
  value?: number;
  min?: number;
  max?: number;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface Bed {
  name: string;
  id: string;
}

export interface BedroomFormState {
  numBedrooms: number;
  beds: Bed[];
}

export type PropertyType = {
  id: string;
  name: string;
};

export type Country = {
  name: string;
};

export interface TypeListProps {
  selectedType: PropertyType;
  setSelectedType: React.Dispatch<React.SetStateAction<PropertyType>>;
}

export interface CountryListProps {
  selectedCountry: Country | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>;
}

export interface StateListProps {
  selectedState: PropertyType | null;
  setSelectedState: React.Dispatch<React.SetStateAction<PropertyType>>;
}

export type PropertyListing = {
  title: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    country: string | undefined;
    postalCode: string;
  };
  price: number;
  thumbnail: string; // Assuming it's a base64-encoded image
  metadata: {
    propertyType: string;
    numBathrooms: number;
    numBedrooms: number;
    beds: { [key: string]: string };
    propertyAmenities: string[]; // Assuming it's an array of property amenities
  };
};

export type DeleteListingProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRunEffect: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SingleListing = PropertyListing & {
  owner: string;
  reviews: Review[];
  availability: Availability[];
  published: boolean;
  postedOn: string;
};

export type GetSingleListingReturn = {
  listing: SingleListing;
};
export interface CountryReturn {
  name: { common: string };
}

export type FormValues = {
  listingTitle: string;
  streetAddress: string;
  propertyAmenities: string[];
  city: string;
  postalCode: string;
  price: number;
  numBathrooms: number;
  beds: { [key: string]: string };
};
