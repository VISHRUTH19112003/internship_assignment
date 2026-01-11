import axios from "axios";
import type { Artwork } from "../types/Artwork";

const API_URL = "https://api.artic.edu/api/v1/artworks";

export const fetchArtworks = async (
  page: number
): Promise<{
  artworks: Artwork[];
  total: number;
}> => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  const data = response.data;

  return {
    artworks: data.data,
    total: data.pagination?.total ?? 0,
  };
};
