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
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])
  function startGame() {
    setStart(true)
  }
  let correct_answers = 0
  function checkAnswers() {
    if (document.getElementById("checkBtn").innerHTML == `Submit`) {

      let ele = document.getElementsByTagName('input');
      let answers = []
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type = "radio") {
          if (ele[i].checked)
            answers.push(ele[i])
        }
      }
      console.log(answers, "are the answers")
      console.log(questions, "are the questions")
      for (let i = 0; i < questions.length; i++) {
        if (answers[i].value == questions[i].correct_answer) {
          const aTags = document.getElementsByTagName("label")
          const searchText = answers[i].value
          let found
          for (var j = 0; j < aTags.length; j++) {
            if (aTags[j].textContent == searchText) {
              found = aTags[j]
              break;
            }
          }
          document.getElementById(answers[i].id).checked = false;
          found.style.backgroundColor = "#94D7A2"
          correct_answers++
        } else {
          const aTags = document.getElementsByTagName("label")
          const searchText = answers[i].value
          let wrong
          let right
          for (var j = 0; j < aTags.length; j++) {
            if (aTags[j].textContent == searchText) {
              wrong = aTags[j]
            } else if (aTags[j].textContent == questions[i].correct_answer) {
              right = aTags[j]
            }
          }
          document.getElementById(answers[i].id).checked = false;
          wrong.style.backgroundColor = "#F8BCBC"
          right.style.backgroundColor = "#94D7A2"
          right.classList.add("right")
        }
      }
      document.getElementById("score").innerHTML = `You scored ${correct_answers}/5 correct answer(s). ${correct_answers == 5 ? <Confetti /> : ""}`
      document.getElementById("checkBtn").innerHTML = "Play Again"
      console.log(correct_answers)
    } else {
      document.getElementById("score").innerHTML = ``
      document.getElementById("checkBtn").innerHTML = "Submit"
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setQuestions(data.results))
    }
  }
  function generatePos(item) {
    let pos = ["hi", "hi", "hi", "hi"]
    let wrongAnswers = [item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2], item.correct_answer]
    wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5)
    for (let i = 0; i < pos.length; i++) {
      let wrongAnswerIndex = Math.round(Math.random() * wrongAnswers[i]) + 1
      pos[i] = wrongAnswers[i]
      delete wrongAnswerIndex[wrongAnswerIndex]
    }
    return (<Question
      key={nanoid()}
      id={nanoid()}
      name={item.correct_answer}
      correct_answer={item.correct_answer}
      question={(item.question)}
      answer1={pos[0]}
      answer2={pos[1]}
      answer3={pos[2]}
      answer4={pos[3]}
    />)
  }

  return (
    <div>
      <img src={blobBlue} className="blueBlob" />
      <img src={blobYellow} className="yellowBlob" />
      {start ?
        <main>
          {questions.map((item) => {
            return generatePos(item)
          }
          )}
          {
            <div className="btnAndScore">
              <h3 id="score"></h3>
              <button className="check--btn" id="checkBtn" onClick={checkAnswers}>Submit</button>

            </div>
          }
        </main> :
        < Start handleClick={startGame} />
      }
    </div >
  )
}