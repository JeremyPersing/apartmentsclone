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
  address: {
    name: string;
    country: string;
    country_code: string;
    state?: string;
    city?: string;
    postcode?: string;
  };
};
