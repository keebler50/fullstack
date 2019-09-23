import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({ text, statistic }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{statistic}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <>
                <h2>statistics</h2>
                <div>No feedback given</div>
            </>
        )
    }

    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <Statistic text={'good'} statistic={good} />
                    <Statistic text={'neutral'} statistic={neutral} />
                    <Statistic text={'bad'} statistic={bad} />
                    <Statistic text={'all'} statistic={good + neutral + bad} />
                    <Statistic text={'average'} statistic={(good - bad) / (good + neutral + bad)} />
                    <Statistic text={'positive'} statistic={good / (good + neutral + bad) * 100 + ' %'} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <h2>give feedback</h2>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)