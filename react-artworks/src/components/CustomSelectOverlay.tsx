import { useState } from "react";

interface CustomSelectOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSelectCount: (count: number) => void;
}

export const CustomSelectOverlay = ({
  visible,
  onClose,
  onSelectCount,
}: CustomSelectOverlayProps) => {
  const [value, setValue] = useState("");

  if (!visible) return null;

  const submit = () => {
    const count = parseInt(value);
    if (!count || count <= 0) return;
    onSelectCount(count);
    setValue("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
        <h3>Select N Rows</h3>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={submit}>Apply</button>
          <button style={{ marginLeft: 10 }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
