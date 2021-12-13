import React, {useState} from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => {
	return (
		<button onClick = {props.onClick}>
			{props.text}
		</button>
	)
}

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value} {props.suffix}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	let total = good + neutral + bad

	if(total === 0) {
		return (
			'No feedback has been given yet'
		)
	}

	let average = ((good) + (bad * -1))/total
	let positivePercent = (good/total) * 100
	
	return (
		<table>
			<tbody>
				<StatisticLine text = 'Good' value = {good} />
				<StatisticLine text = 'Neutral' value = {neutral} />
				<StatisticLine text = 'Bad' value = {bad} />
				<StatisticLine text = 'Total' value = {total} />
				<StatisticLine text = 'Average' value = {average} />
				<StatisticLine text = 'Positive' value = {positivePercent} suffix = '%' />
			</tbody>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const increaseGood = () => {
		setGood(good + 1)
	}

	const increaseNeutral = () => {
		setNeutral(neutral + 1)
	}

	const increaseBad = () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<Header text = 'Give Feedback' />
			<Button
				onClick = {increaseGood}
				text = 'good'
			/>
			<Button
				onClick = {increaseNeutral}
				text = 'neutral'
			/>
			<Button
				onClick = {increaseBad}
				text = 'bad'
			/>

			<Header text = 'Statistics' />
			<Statistics
				good = {good}
				neutral = {neutral}
				bad = {bad}
			/>
		</div>
  	)
}

export default App;
