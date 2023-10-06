import React from "react"

export default function Question({item, selectAnswer}){
    const {title, correct_answer, answers, selectedAnswer, submitted} = item
    // Generate radio inputs for every question
    const answerElements = answers.map((answer, index) => {
        // Class to style answers once the quiz is submitted
        let answerClass = ""
        // and the logic behind it
        if(!submitted){
            answerClass = ""
        } else if(answer !== correct_answer && answer !== selectedAnswer){
            answerClass = "not-chosen"
        } else if(answer !== correct_answer && answer === selectedAnswer){
            answerClass = "incorrect"
        } else {
            answerClass = "correct"
        }
        
        return(
            <div key={index}>
                <input 
                    type="radio"
                    id={answer}
                    value={answer} 
                    name={title}
                    onClick={selectAnswer}
                    disabled={submitted ? true : false}
                />
                <label htmlFor={answer} className={answerClass}>{answer}</label>
            </div>
        )
    })
    
    return(
        <div className="questions">
            <h3>{title}</h3>
            <fieldset className="answers">
                {answerElements}
            </fieldset>
        </div>
    )
}