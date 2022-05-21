import React from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Start from "./Start"
import Question from "./Question"
import blobBlue from "./images/blobBlue.png"
import blobYellow from "./images/blobYellow.png"
export default function App() {
  const [start, setStart] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [answers, setAnswers] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])
  function startGame() {
    setStart(true)
  }
  function checkAnswers() {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].correct_answer) {
        setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
        const aTags = document.getElementsByTagName("label")
        const searchText = answers[i]
        let found
        for (var j = 0; j < aTags.length; j++) {
          if (aTags[j].textContent == searchText) {
            found = aTags[j]
            break;
          }
        }
        found.style.backgroundColor = "#94D7A2"

      } else {
        const aTags = document.getElementsByTagName("label")
        const searchText = questions[i].correct_answer
        let found
        let wrongFind
        for (var j = 0; j < aTags.length; j++) {
          if (aTags[j].textContent == searchText) {
            found = aTags[j]
            break;
          } else if (aTags[j].textContent == answers[i]) {
            wrongFind = aTags[j]
          }
        }
        found.style.backgroundColor = "#94D7A2"
        wrongFind.style.backgroundColor = "#F8BCBC"
      }
    }
  }
  function handleChange(event) {
    const { name, value, type, checked } = event.target
    document.getElementById(event.target.id).checked = true;
    if (answers.includes(value)) {
      answers.push(" ")
      delete answers[answers.indexOf(value) + 1]
      delete answers[answers.indexOf(undefined) + 1]
    }
    console.log(answers, answers.indexOf(value), value)
    setAnswers(prevFormData => {
      return [
        ...prevFormData, value
      ]
    })
    console.log(answers)
  }
  return (
    <div>
      <img src={blobBlue} className="blueBlob" />
      <img src={blobYellow} className="yellowBlob" />
      {start ?
        <main>
          {questions.map((item) => {
            return <Question
              key={nanoid()}
              id={nanoid()}
              name={item.correct_answer}
              correct_answer={item.correct_answer}
              question={(item.question)}
              answer1={item.incorrect_answers[0]}
              answer2={item.incorrect_answers[1]}
              answer3={item.incorrect_answers[2]}
              answer4={item.correct_answer}
              handleChange={handleChange}
            />
          }
          )}
          {
            correctAnswers == 5 ?
              <div>
                <h3>You scored{correctAnswers}/5 correct answer(s)</h3>
                <Confetti />
              </div> : correctAnswers ?
                <h3>You scored{correctAnswers}/5 correct answer(s)</h3>
                : ""}
          <button className="check--btn" onClick={checkAnswers}>Check</button>
        </main> :
        < Start handleClick={startGame} />
      }
    </div >
  )
}