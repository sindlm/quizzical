import React from "react"
import { decode } from 'html-entities'
import Question from './Question'

export default function Quiz({apiSettings, playAgain}){
    const {amount, category, type} = apiSettings
    // State to save Quiz data
    const [allData, setAllData] = React.useState([])
    // State to determine result score
    const [results, setResults] = React.useState({
        correct: 0,
        display: false,
        missingAnswer: false
    })
    
    // Fetch the questions from API and save to state
    React.useEffect(() =>{
        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`)
            .then(res => res.json())
            .then(data => {
                // Map through the fetched data, decode them and create answers array
                const updatedData = data.results.map((item, index) => {
                    const updatedCorrectAnswer = decode(item.correct_answer)
                    const updatedWrongAnswers = item.incorrect_answers.map(answer => (decode(answer)))
                    
                    let answers = []
                    let randomIndex = Math.floor(Math.random() * (updatedWrongAnswers.length + 1));
                    answers.push(...updatedWrongAnswers)
                    answers.splice(randomIndex, 0, updatedCorrectAnswer);
                    
                    return {
                        ...item,
                        id: index,
                        title: decode(item.question),
                        correct_answer: updatedCorrectAnswer,
                        incorrect_answers: updatedWrongAnswers,
                        answers: answers,
                        selectedAnswer: "",
                        submitted: false,
                    }
                })
                setAllData(updatedData)
            })
    }, [])
    // Generate questions that will be rendered
    const questionElements = allData.map((item, index) => {
        return(
            <Question
                key={index}
                item={item}
                selectAnswer={(e) => selectAnswer(e)}
            />
        )
    })
    // Save the answer user selected
    function selectAnswer(e) {
        setAllData(prevData => prevData.map(item => {
            if(item.title === e.target.name) {
                return{...item, selectedAnswer: e.target.value}
            } 
            else {
                return {...item}
            }
        }))
    }
    
    function checkCorrectness(){
        //Check if every question has been answered
        if(allData.every(item => item.selectedAnswer)){
            // Mark all questions as submitted
            setAllData(prevData => prevData.map(item => ({...item, submitted: true})))
            //Count how many answers were correct
            const correctResults = allData.map(item => {
                if(item.selectedAnswer === item.correct_answer){
                    setResults(prevData => ({...prevData, correct: prevData.correct + 1}))
                }
            })
            // Display results
            setResults(prevData => ({...prevData, missingAnswer: false, display: true}))
        } else {
            // If not, display a warning that there are missing answers
            setResults(prevData => ({...prevData, missingAnswer: true}))
        }
    }
    
    return(
        <main className="quiz">
            {questionElements}
            <div className="results">
                {results.missingAnswer && <h3 className="missing-answer">Please answer all questions!</h3>}
                {results.display && <h3 className="score">You scored {results.correct}/{allData.length} correct answers</h3>}
                {results.display ?
                <button className="quiz-btn" onClick={playAgain}>Play again</button> : 
                <button className="quiz-btn" onClick={checkCorrectness}>Check answers</button>}
            </div>
        </main>
    )
}