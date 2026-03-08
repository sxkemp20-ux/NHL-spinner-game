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

function createEmptyLineup() {
  return {
    C: { player: "", pick: null },
    LW: { player: "", pick: null },
    RW: { player: "", pick: null },
    D1: { player: "", pick: null },
    D2: { player: "", pick: null },
    G: { player: "", pick: null }
  };
}

export default function App() {

  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  const [lineup1, setLineup1] = useState(createEmptyLineup());
  const [lineup2, setLineup2] = useState(createEmptyLineup());

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

      let pick = current.pick;

      if (!pick && value.trim() !== "") {
        pick = pickNumber;
        setPickNumber(p => p + 1);
      }

      return {
        ...prev,
        [position]: {
          player: value,
          pick
        }
      };
    });

  } else {

    setLineup2(prev => {
      const current = prev[position];

      let pick = current.pick;

      if (!pick && value.trim() !== "") {
        pick = pickNumber;
        setPickNumber(p => p + 1);
      }

      return {
        ...prev,
        [position]: {
          player: value,
          pick
        }
      };
    });

  }
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