import React, { useEffect, useState } from "react";
import { Game } from "src/types/types";
import styles from "./SoccerScore.module.css";
import { generateUniqueId } from "./../utils/uniqueId";

type Props = {
	results: Game[];
};

const SoccerScore: React.FC<Props> = ({ results }) => {
	const [games, setGames] = useState<Game[]>(results);
	const [sortedGames, setSortedGames] = useState<Game[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [selectedGameId, setSelectedGameId] = useState("");

	const handleStartGame = () => {
		setShowForm(true);
	};

	const handleShowSummary = () => {
		setShowSummary(!showSummary);
	};

	const handleUpdateGame = (id: string) => {
		setSelectedGameId(id);
		setShowUpdateForm(true);
	};

	const handleAddSubmit = (event: any) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const homeTeamInput = form.elements.namedItem(
			"homeTeam"
		) as HTMLInputElement;
		const awayTeamInput = form.elements.namedItem(
			"awayTeam"
		) as HTMLInputElement;

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

	const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const homeScoreInput = form.elements.namedItem(
			"homeScore"
		) as HTMLInputElement;
		const awayScoreInput = form.elements.namedItem(
			"awayScore"
		) as HTMLInputElement;

		const homeScore = +homeScoreInput.value;
		const awayScore = +awayScoreInput.value;

		setGames((prevGames) => {
			return prevGames.map((game) => {
				if (game.id === selectedGameId) {
					return {
						...game,
						home_score: homeScore,
						away_score: awayScore,
					};
				}
				return game;
			});
		});

		setSelectedGameId("");
		setShowUpdateForm(false);
	};

	useEffect(() => {
		const sortedCopy = [...games].sort((a, b) => {
			const totalScoreDiff =
				b.home_score + b.away_score - (a.home_score + a.away_score);
			if (totalScoreDiff !== 0) {
				return totalScoreDiff;
			} else {
				return games.indexOf(b) - games.indexOf(a);
			}
		});

		setSortedGames(sortedCopy);
	}, [games]);

	return (
		<>
			<div>
				<button onClick={handleStartGame}>Start game</button>
				<button onClick={handleShowSummary}>Show Summary</button>
				{showForm && (
					<form data-testid="add-game-form" onSubmit={handleAddSubmit}>
						<input
							type="text"
							name="homeTeam"
							placeholder="Home team"
							required
						/>
						<input
							type="text"
							name="awayTeam"
							placeholder="Away team"
							required
						/>
						<button type="submit">Submit New Game</button>
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
							<button
								className={styles.updateGameButton}
								data-testid={`update-button-${result.id}`}
								onClick={() => handleUpdateGame(result.id)}
							>
								Update Game
							</button>
							{showUpdateForm && selectedGameId === result.id && (
								<form
									data-testid={`update-form-${result.id}`}
									onSubmit={handleUpdateSubmit}
								>
									<input
										min="0"
										type="number"
										name="homeScore"
										placeholder="Home score"
										defaultValue={result.home_score}
										required
									/>
									<input
										min="0"
										type="number"
										name="awayScore"
										placeholder="Away score"
										defaultValue={result.away_score}
										required
									/>
									<button type="submit">Submit Updated Game</button>
								</form>
							)}
						</li>
					);
				})}
			</ul>
			{showSummary &&
				sortedGames.map((game) => {
					return (
						<h1 key={`key-${game.id}`} data-testid={`game-heading-${game.id}`}>
							{`${game.home_team} - ${game.home_score} : ${game.away_team} - ${game.away_score}`}
						</h1>
					);
				})}
		</>
	);
};

export { SoccerScore };
