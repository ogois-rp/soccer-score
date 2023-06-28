import React, { useState, useEffect } from "react";
import { Game } from "src/types/types";
import styles from "./SoccerScore.module.css";

type Props = {
	results: Game[];
};

const SoccerScore: React.FC<Props> = ({ results }) => {
	const [games, setGames] = useState(results);

	const handleEndGame = (id: string) => {
    setGames((prevGames) => {
      // Filter out the game with the given ID
      const updatedGames = prevGames.filter((game) => game.id !== id);
      return updatedGames;
    });
  };

	return (
		<ul>
			{games.map((result) => {
				return (
					<li className={styles.gameListItem} key={result.id}>
						<span
							data-testid={`game-${result.id}`}
						>{`${result.home_team} : ${result.home_score} - ${result.away_team} : ${result.away_score}`}</span>
						<button
							data-testid={`button-${result.id}`}
							onClick={() => handleEndGame(result.id)}
						>
							End Game
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export { SoccerScore };
