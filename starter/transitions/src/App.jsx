import { useState, useEffect, useTransition } from "react";
import Score from "./Score";
import getScore from "./getScore";

export default function App() {
  const [isPending, startTransition] = useTransition();
  const [game, setGame] = useState(1);
  const [score, setScore] = useState({ home: "–", away: "–" });

  async function getNewScore(game) {
    startTransition(async () => {
      // this code is deferred so it doesn't block the UI
      // and to make sure we get the right last state update
      // so react ignores updating with all the games and only updates with the last selected one.
      // so now user can re-select if selected a wrong one and still get the right data.
      const newScore = await getScore(game);
      setScore(newScore);
    });
  }

  useEffect(() => {
    getNewScore(game);
  }, [game]);

  return (
    <div className="app">
      <h1>Game {game}</h1>
      <select
        onChange={(e) => {
          setGame(e.target.value);
        }}
      >
        <option value={1}>Game 1</option>
        <option value={2}>Game 2</option>
        <option value={3}>Game 3</option>
        <option value={4}>Game 4</option>
        <option value={5}>Game 5</option>
        <option value={6}>Game 6</option>
        <option value={7}>Game 7</option>
      </select>
      <div className={`loading-container ${isPending ? "loading" : ""}`}>
        {" "}
        <span className="spinner">⚽️</span>
      </div>
      <div>
        <Score
          isPending={isPending}
          homeImage={score.homeImage}
          homeName={score.homeName}
          awayImage={score.awayImage}
          awayName={score.awayName}
          home={score.home}
          away={score.away}
        />
      </div>
    </div>
  );
}
