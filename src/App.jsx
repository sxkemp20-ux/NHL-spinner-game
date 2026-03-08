import { useState } from "react";

const teams = [
  "Anaheim Ducks","Utah Mammoth","Boston Bruins","Buffalo Sabres",
  "Calgary Flames","Carolina Hurricanes","Chicago Blackhawks",
  "Colorado Avalanche","Columbus Blue Jackets","Dallas Stars",
  "Detroit Red Wings","Edmonton Oilers","Florida Panthers",
  "Los Angeles Kings","Minnesota Wild","Montreal Canadiens",
  "Nashville Predators","New Jersey Devils","New York Islanders",
  "New York Rangers","Ottawa Senators","Philadelphia Flyers",
  "Pittsburgh Penguins","San Jose Sharks","Seattle Kraken",
  "St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs",
  "Vancouver Canucks","Vegas Golden Knights","Washington Capitals",
  "Winnipeg Jets"
];

function logoURL(team) {
  return `https://loodibee.com/wp-content/uploads/nhl-${team
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(".", "")
  }-logo.png`;
}

const emptyLineup = {
  C: { player: "", pick: null },
  LW: { player: "", pick: null },
  RW: { player: "", pick: null },
  D1: { player: "", pick: null },
  D2: { player: "", pick: null },
  G: { player: "", pick: null }
};

export default function App() {
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [lineup1, setLineup1] = useState(() => ({ ...emptyLineup }));
const [lineup2, setLineup2] = useState(() => ({ ...emptyLineup }));
  const [pickNumber, setPickNumber] = useState(1);

  function spinTeam1() {
    const random = teams[Math.floor(Math.random() * teams.length)];
    setTeam1(random);
  }

  function spinTeam2() {
    const random = teams[Math.floor(Math.random() * teams.length)];
    setTeam2(random);
  }

  function updatePlayer(teamNumber, position, value) {
    if (teamNumber === 1) {
      setLineup1(prev => {
        const current = prev[position];

        if (!current.player && value) {
          const updated = {
  ...prev,
  [position]: { player: value, pick: prev[position].pick ?? pickNumber }
};
          setPickNumber(prev => prev + 1);
          return updated;
        }

        return {
          ...prev,
          [position]: { ...current, player: value }
        };
      });

    } else {
      setLineup2(prev => {
        const current = prev[position];

        if (!current.player && value) {
          const updated = {
            ...prev,
            [position]: { player: value, pick: pickNumber }
          };
          setPickNumber(prev => prev + 1);
          return updated;
        }

        return {
          ...prev,
          [position]: { ...current, player: value }
        };
      });
    }
  }

  return (
    <div style={{
      fontFamily: "Arial",
      background: "#0f172a",
      minHeight: "100vh",
      width: "100vw",
      padding: 40,
      color: "white",
      boxSizing: "border-box"
    }}>
      <h1 style={{ fontSize: 42, marginBottom: 30 }}>
        🏒 NHL Spinner Game
      </h1>

      <div style={{
        display: "flex",
        gap: 40,
        width: "100%"
      }}>

        {/* TEAM 1 */}
        <div style={{
          flex: 1,
          background: "#1e293b",
          padding: 30,
          borderRadius: 16
        }}>
          <button onClick={spinTeam1} style={buttonStyle}>
            Spin Team 1
          </button>

          {team1 && (
            <>
              <h2 style={{ textAlign: "center" }}>{team1}</h2>
              <img
                src={logoURL(team1)}
                alt={team1}
                style={{
                  width: 120,
                  display: "block",
                  margin: "10px auto"
                }}
              />

              {renderLineup(lineup1, 1, updatePlayer)}
            </>
          )}
        </div>

        {/* TEAM 2 */}
        <div style={{
          flex: 1,
          background: "#1e293b",
          padding: 30,
          borderRadius: 16
        }}>
          <button onClick={spinTeam2} style={buttonStyle}>
            Spin Team 2
          </button>

          {team2 && (
            <>
              <h2 style={{ textAlign: "center" }}>{team2}</h2>
              <img
                src={logoURL(team2)}
                alt={team2}
                style={{
                  width: 120,
                  display: "block",
                  margin: "10px auto"
                }}
              />

              {renderLineup(lineup2, 2, updatePlayer)}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

function renderLineup(lineup, teamNumber, updatePlayer) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 20
    }}>
      {Object.keys(lineup).map(position => (
        <div key={position} style={{ position: "relative" }}>
          <label>{position}</label>

          {lineup[position].pick && (
  <div style={{
    position: "absolute",
    top: -8,
    right: -8,
    background: "#ef4444",
    width: 22,
    height: 22,
    borderRadius: "50%",
    fontSize: 12,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
    border: "2px solid white"
  }}>
    {lineup[position].pick}
  </div>
)}

          <input
            value={lineup[position].player}
            onChange={(e) =>
              updatePlayer(teamNumber, position, e.target.value)
            }
            placeholder="Enter player"
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              borderRadius: 6,
              border: "none"
            }}
          />
        </div>
      ))}
    </div>
  );
}

const buttonStyle = {
  padding: "12px 24px",
  fontSize: 16,
  background: "#cc0000",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  marginBottom: 20
};