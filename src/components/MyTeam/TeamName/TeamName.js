import { useState } from "react";
import "./TeamName.scss";

const TeamName = ({ teamNameHandler }) => {
    const [inputValue, setInputValue] = useState("");

    const handleClick = (e) => {
        teamNameHandler(inputValue,true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="input-form-container">
            <input
                className="teamInputName"
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
