import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0))
    const [maxVotes, setMaxVotes] = useState(0)

    const handleVote = () => {
        let updateVotes = [...votes]
        updateVotes[selected] += 1
        setVotes(updateVotes)
        if (updateVotes[selected] > updateVotes[maxVotes]) {
            setMaxVotes(selected)
        }
    }

    return (
        <>
            <h2>Anecdote of the day</h2>
            <div>{props.anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <button onClick={handleVote}>vote</button>
            <button onClick={() => setSelected(Math.floor(Math.random() * Math.floor(6)))}>next anecdote</button>
            <h2>Anecdote with most votes</h2>
            <div>{props.anecdotes[maxVotes]}</div>
            <div>has {votes[maxVotes]} votes</div>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)