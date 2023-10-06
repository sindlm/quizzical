import React from "react"

export default function Intro({apiSettings, setApiSettings, startQuiz}){
    const [quizCategory, setQuizCategory] = React.useState([])
    // Fetch Quiz Categories from API and save to state
    React.useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => {
                setQuizCategory(data.trivia_categories)
            })
    },[])
    
    // Generate category options
    const categoryOptions = quizCategory.map(option => {
        return(<option value={option.id} key={option.id}>{option.name}</option>)
    })
    // Generate difficulty options
    const difficulty = ['Easy', 'Medium', 'Hard']
    const difficultyOptions = difficulty.map((option, index) => {
        return (<option value={option} key={index}>{option}</option>)
    })

    // Change the properties based on user choice for incoming API call.
    function setupApi(e) {
        if(e.target.id === 'categories') {
        setApiSettings(prevData => ({...prevData, category: e.target.value}))
        } 
        else if(e.target.id === 'difficulty') {
          setApiSettings(prevData => ({...prevData, difficulty: e.target.value}))
        } 
        else if(e.target.id === 'questionsAmount') {
            setApiSettings(prevData => ({...prevData, amount: e.target.value}))
        }
     }
    
    return(
        <div className="intro">
            <h1>Quizzical</h1>
            <div className="quiz-settings">
                <label htmlFor="categories">Category</label>
                <select name="categories" id="categories" onChange={setupApi}>
                    <option value="">--- Choose an option ---</option>
                    {categoryOptions}
                </select>
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty" onChange={setupApi}>
                    <option value="">--- Choose difficulty ---</option>
                    {difficultyOptions}
                </select>
                <label htmlFor="questionsAmount">Number of questions: {apiSettings.amount}</label>
                <input type="range" id="questionsAmount" min={1} max={10} step={1}
                       value={apiSettings.amount} onChange={setupApi}
                />
                <button className="quiz-btn start-btn" onClick={startQuiz}>Start quiz</button>
            </div>
        </div>
    )
}