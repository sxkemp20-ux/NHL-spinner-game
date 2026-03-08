import { useState } from "react";

const positions = ["G", "C", "LW", "RW", "D1", "D2"];

export default function DraftGame() {
  const [lineup, setLineup] = useState({
    G: { name: "", pick: null },
    C: { name: "", pick: null },
    LW: { name: "", pick: null },
    RW: { name: "", pick: null },
    D1: { name: "", pick: null },
    D2: { name: "", pick: null },
  });

  const updatePlayer = (position, value) => {
    setLineup((prev) => {
      const updated = { ...prev };

      if (value && !updated[position].pick) {
        const nextPick = Object.values(prev).filter((p) => p.pick !== null).length + 1;
        updated[position] = { name: value, pick: nextPick };
      } else {
        updated[position] = { ...updated[position], name: value };
      }

      return updated;
    });
  };

  const resetDraft = () => {
    setLineup({
      G: { name: "", pick: null },
      C: { name: "", pick: null },
      LW: { name: "", pick: null },
      RW: { name: "", pick: null },
      D1: { name: "", pick: null },
      D2: { name: "", pick: null },
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Hockey Draft</h1>
      {positions.map((pos) => (
        <div key={pos} style={{ marginBottom: 15 }}>
          <strong>{pos}</strong>
          <div style={{ position: "relative", display: "inline-block", marginLeft: 10 }}>
            <input
              value={lineup[pos].name}
              placeholder="Player name"
              onChange={(e) => updatePlayer(pos, e.target.value)}
              style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ccc" }}
            />
            {lineup[pos].pick && (
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "red",
                  color: "white",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {lineup[pos].pick}
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={resetDraft}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Reset Draft
      </button>
    </div>
  );
}