import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Anecdote = (props) => <>{props.anecdote}</>

const Button = (props) => <button onClick = {props.onClick}>{props.text}</button>

const Votes = (props) => <>has {props.votes} votes</>

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
	]
   
	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(new Uint8Array(7))

	const nextAnecdote = () => setSelected(Math.floor(Math.random() * 7))
	
	const addVote = () => {
		const newPoints = [...points]
		newPoints[selected] += 1
		setPoints(newPoints)
	}

	const findMax = () => {
		const max = Math.max(...points)
		return points.indexOf(max)
	}
	
	return (
		<div>
			<Header text = 'Anecdote of the day' />
			<Anecdote anecdote = {anecdotes[selected]} /> <br />
			<Votes votes = {points[selected]} /> <br />
			<Button
				onClick = {addVote}
				text = 'Vote'
			/>
			<Button
				onClick = {nextAnecdote}
				text = 'Next anecdote'
			/>

			<Header text = 'Anecdote with the most votes' />
			<Anecdote anecdote = {anecdotes[findMax()]} /> <br />
			<Votes votes = {points[findMax()]} />
		</div>
	)
}

export default App