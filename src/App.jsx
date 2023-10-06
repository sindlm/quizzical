import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App(){
    // false -> Intro || true -> Quiz
    const [quizStart, setQuizStart] = React.useState(false)
    // Default Quiz API fetch settings in case user doesn't choose anything
    const [apiSettings, setApiSettings] = React.useState(
        {
        amount: 5,
        category: 15,
        type: 'multiple',
        difficulty: 'easy'
    })

    function startQuiz(){
        setQuizStart(true)
    }
    
    function playAgain(){
        setQuizStart(false)
    }
    
    return(
        <div className="container">
            {!quizStart && 
            <Intro apiSettings={apiSettings}
                   setApiSettings={setApiSettings}
                   startQuiz={startQuiz}
            />}
            {quizStart &&  
            <Quiz  apiSettings={apiSettings}
                   playAgain={playAgain}
            />}
        </div>
    )
}