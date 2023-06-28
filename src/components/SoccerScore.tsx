import React, { useState } from "react";
import { Game } from "src/types/types";
import styles from "./SoccerScore.module.css";
import { generateUniqueId } from "./../utils/uniqueId";

type Props = {
	results: Game[];
};

const SoccerScore: React.FC<Props> = ({ results }) => {
	const [games, setGames] = useState(results);
	const [showForm, setShowForm] = useState(false);

	const handleStartGame = () => {
		setShowForm(true);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const homeTeamInput = form.elements.namedItem("homeTeam") as HTMLInputElement;
		const awayTeamInput = form.elements.namedItem("awayTeam") as HTMLInputElement;

		const newGame: Game = {
			id: generateUniqueId(),
			home_team: homeTeamInput.value,
			home_score: 0,
			away_team: awayTeamInput.value,
			away_score: 0,
  };

  setGames((prevGames) => [...prevGames, newGame]);
  setShowForm(false);
	};

	const handleEndGame = (id: string) => {
		setGames((prevGames) => {
			// Filter out the game with the given ID
			const updatedGames = prevGames.filter((game) => game.id !== id);
			return updatedGames;
		});
	};

	return (
		<>
			<div>
				<button onClick={handleStartGame}>Start game</button>
				{showForm && (
					<form data-testid="add-game-form" onSubmit={handleSubmit}>
						<input type="text" name="homeTeam" placeholder="Home team" required />
						<input type="text" name="awayTeam" placeholder="Away team" required />
						<button type="submit">Submit</button>
					</form>
				)}
			</div>
			<ul>
				{games.map((result) => {
					return (
						<li className={styles.gameListItem} key={result.id}>
							<span
								data-testid={`game-${result.id}`}
							>{`${result.home_team} : ${result.home_score} - ${result.away_team} : ${result.away_score}`}</span>
							<button
								className={styles.endGameButton}
								data-testid={`button-${result.id}`}
								onClick={() => handleEndGame(result.id)}
							>
								End Game
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export { SoccerScore };
