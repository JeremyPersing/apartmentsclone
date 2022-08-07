export type Location = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: "place" | string;
  type: "city" | "state" | "country" | string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: Address;
};

export type SearchLocation = {
  address: Address;
  boundingbox: string[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: string;
  matchquality: {
    matchcode: string;
    matchlevel:
      | "venue"
      | "building"
      | "street"
      | "neighbourhood"
      | "island"
      | "borough"
      | "city"
      | "county"
      | "state"
      | "country"
      | "marine"
      | "postalcode";
    matchtype: string;
  };
};

type Address = {
  name?: string;
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  island?: string;
  city?: string;
  county?: string;
  state?: string;
  state_code?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};
