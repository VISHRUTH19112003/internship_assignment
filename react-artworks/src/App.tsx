import { useState } from "react";
import { useArtworks } from "./hooks/useArtworks";
import { ArtworkTable } from "./components/ArtworkTable";
import { CustomSelectOverlay } from "./components/CustomSelectOverlay";

function App() {
  const { artworks, page, totalRecords, loading, setPage } = useArtworks();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showOverlay, setShowOverlay] = useState(false);

  const selectRow = (id: number) => {
    setSelectedIds((prev) => new Set(prev).add(id));
  };

  const deselectRow = (id: number) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  const selectAllPage = (ids: number[]) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      ids.forEach((id) => copy.add(id));
      return copy;
    });
  };

  const deselectAllPage = (ids: number[]) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      ids.forEach((id) => copy.delete(id));
      return copy;
    });
  };

  // ******** SAFE BULK SELECT WITHOUT PREFETCH ********
  const handleBulkSelect = (count: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      // Example: count = 15 --> valid global positions = 0..14
      const endIndex = count - 1;

      // Index of first item on this page relative to full dataset
      const pageStartIndex = (page - 1) * 12;

      artworks.forEach((artwork, idx) => {
        const globalIndex = pageStartIndex + idx;

        // Select this row ONLY if it's inside the requested range
        if (globalIndex <= endIndex) {
          next.add(artwork.id);
        }
      });

      return next;
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <button onClick={() => setShowOverlay(true)}>Bulk Select</button>

      <ArtworkTable
        artworks={artworks}
        selectedIds={selectedIds}
        onSelectRow={selectRow}
        onDeselectRow={deselectRow}
        onSelectAllPage={selectAllPage}
        onDeselectAllPage={deselectAllPage}
        page={page}
        totalRecords={totalRecords}
        onPageChange={setPage}
        loading={loading}
      />

      <CustomSelectOverlay
        visible={showOverlay}
        onClose={() => setShowOverlay(false)}
        onSelectCount={handleBulkSelect}
      />
    </div>
  );
}

export default App;
