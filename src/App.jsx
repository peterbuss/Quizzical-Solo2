import React from "react"
import {nanoid} from "nanoid"
//import './style.css'
import Questions from './components/Questions'
import ScorePage from "./components/ScorePage"

export default function App() {

    const [buttonState, setButtonState] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [submitState, setSubmitState] = React.useState(false)
    const [score, setScore] = React.useState(0)
    let [quizCount, setQuizCount] = React.useState(0)
    
    let questionsData = []

    React.useEffect(async function() {
        
        await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => questionsData = data.results.map(item => {
            const { category, type, difficulty, question, correct_answer, incorrect_answers } = item
            return {
                id: nanoid(),
                category: category,
                type: type,
                difficulty: difficulty,
                question: unEscape(question),
                answers: shuffle([correct_answer, ...incorrect_answers]),
                answers_0_id: nanoid(),
                answers_1_id: nanoid(),
                answers_2_id: nanoid(),
                answers_3_id: nanoid(),
                correctAnswer: unEscape(correct_answer),
                selected_0: false,
                selected_1: false,
                selected_2: false,
                selected_3: false,
                right_answer_i: -1
            }
        }))
        //questionsData[0].answers[0]=unEscape(questionsData[0].answers[0])
        for(let q=0; q<5; q++) {
            for(let a=0; a<4; a++) {
                questionsData[q].answers[a]=unEscape(questionsData[q].answers[a])
            }
        }
        
        console.log("questionsData", questionsData)
        setQuestions(questionsData)
    }, [quizCount])
 
     const questionsElements = questions.map((dat) => 
        <Questions key={dat.id} 
        {...dat}
        select_0={() => selectAnswer(dat.answers_0_id)}
        select_1={() => selectAnswer(dat.answers_1_id)}
        select_2={() => selectAnswer(dat.answers_2_id)}
        select_3={() => selectAnswer(dat.answers_3_id)}
        />
        )

    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g, "<");
        htmlStr = htmlStr.replace(/&gt;/g, ">");
        htmlStr = htmlStr.replace(/&quot;/g, '"');
        htmlStr = htmlStr.replace(/&#039;/g, "'");
        htmlStr = htmlStr.replace(/&amp;/g, "&");

        return htmlStr;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function selectAnswer(id) {
        setQuestions(theQuestion => theQuestion.map(ques => {
            
            return  ques.answers_0_id === id ? 
                        {...ques, selected_0: !ques.selected_0,
                        selected_1: false, selected_2: false, selected_3: false} :
                    ques.answers_1_id === id ?
                        {...ques, selected_1: !ques.selected_1,
                        selected_0: false, selected_2: false, selected_3: false} :
                    ques.answers_2_id === id ?
                        {...ques, selected_2: !ques.selected_2,
                        selected_0: false, selected_1: false, selected_3: false} :
                    ques.answers_3_id === id ?
                        {...ques, selected_3: !ques.selected_3,
                        selected_0: false, selected_1: false, selected_2: false} :
                    ques
        }))
    }

    function buttonClick() {
        setButtonState(true)
    }

    console.log("questions:", questions)

    let correct_answer = []

    function submitAnswers() {
        console.log("questions in submit", questions)
        let scoreNum=0
        let selected=-1
        let correctAns=-2

        //console.log("question0 ans0",questions[0].answers[0])
        // question 0
        
        for(let q=0; q<5; q++) {

            selected=-1

            if(questions[q].selected_0===true)
                selected=0
            else
            if(questions[q].selected_1===true)
                selected=1
            else
            if(questions[q].selected_2===true)
                selected=2
            else
            if(questions[q].selected_3===true)
                selected=3

            correctAns=-2
            console.log("question, selected", q, selected)

            for(let a=0; a<4; a++) {
                if(questions[q].answers[a]===questions[q].correctAnswer)
                    correctAns=a
                    correct_answer[q]=correctAns
            }
            if(selected===correctAns) {
                scoreNum = scoreNum + 1
            }
        }

        let id=0
        console.log("correct answer array", correct_answer)
        
        // to set right_answer_i from correct_answer[]
        setQuestions(theQuestion => theQuestion.map((ques) => {
            return  {...ques, right_answer_i: correct_answer[id++] }
        }))
        
        console.log("scoreNum: ", scoreNum)
        setScore(scoreNum)
        console.log("props score", score)
        setSubmitState(true)
    }

    const scoreElements = questions.map((dat, i) => 
                <ScorePage key={dat.id} 
                {...dat}
            />
        )

    console.log("scoreElements", scoreElements)

    function newQuiz() {
        setQuestions([]);
        setSubmitState(false);
        setScore(0);
        questionsData = [];
        setButtonState(true);
        setQuizCount(quizCount+111);
        window.location.reload();
    }

    // Generated url for Open trivia db
    // https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple

    const buttonStyle = {
        marginTop: "30px"
    }

    console.log("Before main render")

    return(
        <main>
            
                { (!buttonState && !submitState) && <div>
                    <h1>Quizzical</h1>
                    <p>My solo project solution - open trivia database</p>
                    <button className="start-button" onClick={buttonClick}>Start Quiz
                    </button>
                </div>}
                {
                    (buttonState && !submitState) && 
                    <div>
                        {/* <h1>Questions</h1> */}
                        {questionsElements}
                        <button className="submit-button" style={buttonStyle} onClick={submitAnswers}>
                            Submit answers
                        </button>
                    </div>
                }
                {
                    (submitState) &&
                    <div>
                        {/* <h1>Score page</h1> */}
                        {scoreElements}
                        <div className="same-line">
                            <p className="score-text">You scored {score}/5 correct answers</p>
                            <button onClick={newQuiz} className="score-button">New Quiz ?</button>
                        </div>
                    </div>
                }
        
        </main>
    )
}
