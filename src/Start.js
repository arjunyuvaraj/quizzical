import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start--heading">Quizzical</h1>
            <button className="start--btn btn" onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}