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
                    onChange={props.handleChange}
                />
                <label htmlFor={props.answer1}>{props.answer1}</label>
                <input type="radio"
                    id={props.answer2}
                    name={props.name}
                    value={props.answer2}
                    onChange={props.handleChange}
                />
                <label htmlFor={props.answer2}>{props.answer2}</label>
                <input type="radio"
                    id={props.answer3}
                    name={props.name}
                    value={props.answer3}
                    onChange={props.handleChange}
                />
                <label htmlFor={props.answer3}>{props.answer3}</label>
                <input type="radio"
                    id={props.answer4}
                    name={props.name}
                    value={props.answer4}
                    onChange={props.handleChange}
                />
                <label htmlFor={props.answer4}>{props.answer4}</label>
            </div>
            <hr />
        </div >
    )
}