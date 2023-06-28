import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { SoccerScore } from "./SoccerScore";

describe("Soccer Score Component Testing Suite", () => {
	test("Should show the scores on the screen", () => {
		const games = [
			{
				id: "ce23",
				home_team: "Portugal",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
		];
		const { getByText } = render(
			<SoccerScore results={games} />
		);

		expect(getByText("Portugal : 1 - Morocco : 1")).toBeInTheDocument();
	});

	test("End Game Button should display on hover", () => {
		const games = [
			{
				id: "ce23",
				home_team: "Portugal",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
			{
				id: "ce1223",
				home_team: "Argentina",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
		];
		render(<SoccerScore results={games} />);

		screen.debug()

    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);

    const buttonElement = screen.getByTestId("button-ce23");

    expect(buttonElement).toHaveStyle("display: inline-block");
	});

  test("Clicking 'End Game' should remove the game from the screen", () => {
    const games = [
      {
        id: "ce23",
        home_team: "Portugal",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
      {
        id: "ce1223",
        home_team: "Argentina",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
    ];
  
    render(<SoccerScore results={games} />);
  
    // Verify the initial rendering
    expect(screen.getByTestId("game-ce23")).toBeInTheDocument();
    expect(screen.getByTestId("game-ce1223")).toBeInTheDocument();
  
    // Trigger a click on the 'End Game' button
    const buttonElement = screen.getByTestId("button-ce23");
    fireEvent.click(buttonElement);
  
    // Verify the game with ID 'ce23' is no longer in the document
    expect(screen.queryByTestId("game-ce23")).not.toBeInTheDocument();
    // Verify the game with ID 'ce1223' is still in the document
    expect(screen.getByTestId("game-ce1223")).toBeInTheDocument();
  })

  test("Clicking 'Start game' button displays two form inputs and a submit button", () => {
    render(<SoccerScore results={[]} />);
  
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
  
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit");
  
    expect(homeInput).toBeInTheDocument();
    expect(awayInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Submitting the form with all empty inputs prevents submission", () => {
    const games = [
      {
        id: "ce23",
        home_team: "Portugal",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
      {
        id: "ce1223",
        home_team: "Argentina",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
    ];
  
    render(<SoccerScore results={games} />);
    
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    const formElement = screen.queryByTestId("add-game-form");
    
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    
    const submitButton = screen.getByText("Submit");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeInvalid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with one empty input prevents submission", () => {
    
    const games = [
      {
        id: "ce23",
        home_team: "Portugal",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
      {
        id: "ce1223",
        home_team: "Argentina",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
    ];
  
    render(<SoccerScore results={games} />);
    
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    
    const formElement = screen.queryByTestId("add-game-form")
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit");
    
    fireEvent.input(homeInput, { target: { value: "Argelia" } });

    fireEvent.click(submitButton);
    
    expect(homeInput).toBeValid()
    expect(awayInput).toBeInvalid()

     // Assuming you have a data-testid attribute on your form element

    expect(formElement).toBeInTheDocument();
  });

  test("Submitting the form both inputs complete adds a new game and closes the form", () => {
    
    const games = [
      {
        id: "ce23",
        home_team: "Portugal",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
      {
        id: "ce1223",
        home_team: "Argentina",
        home_score: 1,
        away_team: "Morocco",
        away_score: 1,
      },
    ];
  
    const {getByText } = render(<SoccerScore results={games} />);
    
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    
    const formElement = screen.queryByTestId("add-game-form")
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit");
    
    fireEvent.input(homeInput, { target: { value: "Argelia" } });
    fireEvent.input(awayInput, { target: { value: "Paraguai" } });

    fireEvent.click(submitButton);
    
    expect(getByText("Argelia : 0 - Paraguai : 0")).toBeInTheDocument();
     // Assuming you have a data-testid attribute on your form element

    expect(formElement).not.toBeInTheDocument();
  });
})
