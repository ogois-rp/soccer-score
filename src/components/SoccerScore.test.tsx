import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { SoccerScore } from "./SoccerScore";

describe("Soccer Score Component Testing Suite", () => {
  let games;

  beforeEach(() => {
    games = [
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
  });

	test("Should show the scores on the screen", () => {
		expect(screen.getByTestId("game-ce23")).toHaveTextContent("Portugal : 1 - Morocco : 1");
	});

	test("End Game Button should display on hover", () => {
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);

    const buttonElement = screen.getByTestId("button-ce23");

    expect(buttonElement).toHaveStyle("display: inline-block");
	});

  test("Clicking 'End Game' should remove the game from the screen", () => {
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
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
  
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit New Game");
  
    expect(homeInput).toBeInTheDocument();
    expect(awayInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Submitting the form with all empty inputs prevents submission", () => { 
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    const formElement = screen.queryByTestId("add-game-form");
    
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    
    const submitButton = screen.getByText("Submit New Game");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeInvalid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with one empty input prevents submission", () => {   
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    
    const formElement = screen.queryByTestId("add-game-form")
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit New Game");
    
    fireEvent.input(homeInput, { target: { value: "Argelia" } });

    fireEvent.click(submitButton);
    
    expect(homeInput).toBeValid()
    expect(awayInput).toBeInvalid()

     // Assuming you have a data-testid attribute on your form element

    expect(formElement).toBeInTheDocument();
  });

  test("Submitting the form both inputs complete adds a new game and closes the form", () => {
    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
    
    const formElement = screen.queryByTestId("add-game-form")
    const homeInput = screen.getByPlaceholderText("Home team");
    const awayInput = screen.getByPlaceholderText("Away team");
    const submitButton = screen.getByText("Submit New Game");
    
    fireEvent.input(homeInput, { target: { value: "Argelia" } });
    fireEvent.input(awayInput, { target: { value: "Paraguai" } });

    fireEvent.click(submitButton);
    
    expect(screen.getByText("Argelia : 0 - Paraguai : 0"));
     // Assuming you have a data-testid attribute on your form element

    expect(formElement).not.toBeInTheDocument();
  });

  test("Update Game Button should display on hover", () => {
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);

    const buttonElement = screen.getByTestId("update-button-ce23");

    expect(buttonElement).toHaveStyle("display: inline-block");
	});

  test("Clicking 'Update Game' button displays two form inputs and a submit button", () => {
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
  
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");
    const submitButton = screen.getByText("Submit Updated Game");
  
    expect(homeInput).toBeInTheDocument();
    expect(awayInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Clicking 'Update Game' button displays two form inputs and a submit button", () => {
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
  
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");
    const submitButton = screen.getByText("Submit Updated Game");
  
    expect(homeInput).toBeInTheDocument();
    expect(awayInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Submitting the form with all negative inputs prevents submission", () => { 
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
    const formElement = screen.queryByTestId("update-form-ce23");
    
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");

    fireEvent.input(homeInput, { target: { value: "-1" } });
    fireEvent.input(awayInput, { target: { value: "-1" } });
    
    const submitButton = screen.getByText("Submit Updated Game");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeInvalid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with one negative input prevents submission", () => { 
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
    const formElement = screen.queryByTestId("update-form-ce23");
    
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");

    fireEvent.input(awayInput, { target: { value: "-1" } });
    
    const submitButton = screen.getByText("Submit Updated Game");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeValid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with one empty input prevents submission", () => { 
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
    const formElement = screen.queryByTestId("update-form-ce23");
    
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");

    fireEvent.input(homeInput, { target: { value: "" } });
    fireEvent.input(awayInput, { target: { value: "" } });
    
    const submitButton = screen.getByText("Submit Updated Game");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeInvalid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with one empty input prevents submission", () => { 
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
    const formElement = screen.queryByTestId("update-form-ce23");
    
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");

    fireEvent.input(awayInput, { target: { value: "" } });
    
    const submitButton = screen.getByText("Submit Updated Game");
    
    fireEvent.click(submitButton);
    
    expect(homeInput).toBeValid()
    expect(awayInput).toBeInvalid()
    expect(formElement).toBeInTheDocument()
  });

  test("Submitting the form with all valid inputs updates the score", () => { 
    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);
  
    const buttonElement = screen.getByTestId("update-button-ce23");
    fireEvent.click(buttonElement);
    const formElement = screen.queryByTestId("update-form-ce23");
    
    const homeInput = screen.getByPlaceholderText("Home score");
    const awayInput = screen.getByPlaceholderText("Away score");

    fireEvent.input(homeInput, { target: { value: "3" } });
    fireEvent.input(awayInput, { target: { value: "2" } });
    
    const submitButton = screen.getByText("Submit Updated Game");
    
    fireEvent.click(submitButton);
    
    expect(formElement).not.toBeInTheDocument()
    expect(screen.getByTestId("game-ce23")).toHaveTextContent("Portugal : 3 - Morocco : 2");
  });

  test("'Summary' button should be on dom", () => {
    const summaryButton = screen.getByText("Show Summary");

    expect(summaryButton).toBeInTheDocument();
  });

  test("'Summary' button click displays the games", () => {
    const summaryButton = screen.getByText("Show Summary");
    fireEvent.click(summaryButton);

    const gameOne = screen.getByTestId("game-heading-ce23");
    const gameTwo = screen.getByTestId("game-heading-ce1223")
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
    expect(gameOne).toHaveTextContent("Portugal - 1 : Morocco - 1");
    expect(gameTwo).toHaveTextContent("Argentina - 1 : Morocco - 1");
  });

  test("'Summary'second button click hides the games", () => {
    const summaryButton = screen.getByText("Show Summary");
    fireEvent.click(summaryButton);

    const gameOne = screen.getByTestId("game-heading-ce23");
    const gameTwo = screen.getByTestId("game-heading-ce1223")
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
    expect(gameOne).toHaveTextContent("Portugal - 1 : Morocco - 1");
    expect(gameTwo).toHaveTextContent("Argentina - 1 : Morocco - 1");

    fireEvent.click(summaryButton);

    expect(gameOne).not.toBeInTheDocument();
    expect(gameTwo).not.toBeInTheDocument();
  });

  test("'Summary' click should show the games in correct order", () => {
    expect(screen.getByTestId("game-ce23")).toBeInTheDocument();
    expect(screen.getByTestId("game-ce1223")).toBeInTheDocument();

    const buttonElementToDel1 = screen.getByTestId("button-ce23");
    fireEvent.click(buttonElementToDel1);
    
    const buttonElementToDel2 = screen.getByTestId("button-ce1223");
    fireEvent.click(buttonElementToDel2);
  
    // Trigger a click on the 'End Game' button

    const startGameButton = screen.getByText("Start game");
    fireEvent.click(startGameButton);
        
    let homeInput = screen.getByPlaceholderText("Home team");
    let awayInput = screen.getByPlaceholderText("Away team");
    let submitButton = screen.getByText("Submit New Game");
    
    fireEvent.input(homeInput, { target: { value: "Argelia" } });
    fireEvent.input(awayInput, { target: { value: "Paraguai" } });

    fireEvent.click(submitButton);
    fireEvent.click(startGameButton);

    homeInput = screen.getByPlaceholderText("Home team");
    awayInput = screen.getByPlaceholderText("Away team");
    submitButton = screen.getByText("Submit New Game");
    
    fireEvent.input(homeInput, { target: { value: "Mali" } });
    fireEvent.input(awayInput, { target: { value: "Cameroon" } });
    fireEvent.click(submitButton);

    const summaryButton = screen.getByText("Show Summary");
    fireEvent.click(summaryButton);

    const element1 = screen.getByText("Argelia - 0 : Paraguai - 0");
    const element2 = screen.getByText("Mali - 0 : Cameroon - 0");
    

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();

    expect(element2.compareDocumentPosition(element1)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
})
