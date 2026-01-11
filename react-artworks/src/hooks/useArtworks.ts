import { useEffect, useState } from "react";
import { fetchArtworks } from "../services/artworkService";
import type { Artwork } from "../types/Artwork";

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchArtworks(page);
        setArtworks(result.artworks);
        setTotalRecords(result.total);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
      setLoading(false);
    };

    load();
  }, [page]);

  return {
    artworks,
    page,
    totalRecords,
    loading,
    setPage,
  };
};
