import React from "react"

export default function Question(props) {
    return (
        <div className="question">
            <h1 className="form--heading">{props.question}</h1>
            <div className="answers">
                <input type="radio"
                    id={props.answer1}
                    name={props.name}
                    value={props.answer1}
                />
                <label htmlFor={props.answer1} onClick={props.handleChange}>{props.answer1}</label>
                <input type="radio"
                    id={props.answer2}
                    name={props.name}
                    value={props.answer2}
                />
                <label htmlFor={props.answer2} onClick={props.handleChange}>{props.answer2}</label>
                <input type="radio"
                    id={props.answer3}
                    name={props.name}
                    value={props.answer3}
                />
                <label htmlFor={props.answer3} onClick={props.handleChange}>{props.answer3}</label>
                <input type="radio"
                    id={props.answer4}
                    name={props.name}
                    value={props.answer4}
                />
                <label htmlFor={props.answer4} onClick={props.handleChange}>{props.answer4}</label>
            </div>
            <hr />
        </div >
    )
}