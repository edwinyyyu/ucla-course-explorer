import './style.css';
import React, { useState } from "react";
import Arrow from "./Arrow.svg";


function CourseInputPage() {
    const [text, setText] = useState("");
    function handleSearch() {
        console.log(text);
    };

    return(
    <div className='Container'> 
        <h2>What course are you mapping?</h2>
        <input 
            className="TextInput" 
            type = "text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}>
        </input>
        <br />
        <button className="SearchButton" onClick={handleSearch}> 
            <img src={Arrow} width = {25} height = {25} /> 
        </button>
    </div>
    );

}

export default CourseInputPage;