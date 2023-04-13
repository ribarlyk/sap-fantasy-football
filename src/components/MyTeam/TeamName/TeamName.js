import { useState } from "react";
import "./TeamName.scss";

const TeamName = ({ teamNameHandler }) => {
    const [inputValue, setInputValue] = useState("");
    // const [isNameSaved, setIsNameSaved] = useState(false);

    const handleClick = (e) => {
        // setIsNameSaved(true);
        teamNameHandler(inputValue,true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="input-form-container">
            <input
                type="text"
                placeholder="Enter team name here..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="blue-button" onClick={handleClick}>
                Save Name
            </button>
        </div>
    );
};

export default TeamName;
