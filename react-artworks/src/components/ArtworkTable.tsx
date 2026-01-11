import type { Artwork } from "../types/Artwork";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

interface ArtworkTableProps {
  artworks: Artwork[];
  selectedIds: Set<number>;
  onSelectRow: (id: number) => void;
  onDeselectRow: (id: number) => void;
  onSelectAllPage: (ids: number[]) => void;
  onDeselectAllPage: (ids: number[]) => void;
  page: number;
  totalRecords: number;
  onPageChange: (newPage: number) => void;
  loading: boolean;
}

export const ArtworkTable = ({
  artworks,
  selectedIds,
  onSelectRow,
  onDeselectRow,
  onSelectAllPage,
  onDeselectAllPage,
  page,
  totalRecords,
  onPageChange,
  loading,
}: ArtworkTableProps) => {
  const rowsPerPage = 12;

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      onSelectRow(id);
    } else {
      onDeselectRow(id);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const ids = artworks.map((a) => a.id);
    if (checked) {
      onSelectAllPage(ids);
    } else {
      onDeselectAllPage(ids);
    }
  };

  return (
    <div className="p-4">
      <DataTable value={artworks} loading={loading}>
        <Column
          header={() => {
            return (
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={
                  artworks.length > 0 &&
                  artworks.every((a) => selectedIds.has(a.id))
                }
              />
            );
          }}
          body={(row: Artwork) => {
            return (
              <input
                type="checkbox"
                checked={selectedIds.has(row.id)}
                onChange={(e) => handleCheckboxChange(row.id, e.target.checked)}
              />
            );
          }}
        />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start" />
        <Column field="date_end" header="End" />
      </DataTable>

      <Paginator
        first={(page - 1) * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={(e) => onPageChange(e.page + 1)}
      />
    </div>
  );
};
