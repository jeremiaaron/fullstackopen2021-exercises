import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Conversion from './components/Conversion'

const CountryName = ({name, country}) => {
  const [show, setShow] = useState(false)
  const [btnText, setBtnText] = useState('show')

  const onClick = () => {
    if(!show) {
      setBtnText('hide')
      setShow(true)
    }
    else {
      setBtnText('show')
      setShow(false)
    }
  }

  return (
    <div>
      {name}
      <button onClick = {onClick}>{btnText}</button>
      {show && (<OneCountry country = {country} />)}
    </div>
  )
}

const Language = ({language}) => <li>{language}</li>

const Languages = ({languages}) => {
    return (
      Object
        .entries(languages)
        .map(([key, value]) => <Language key = {key} language = {value} />)
    )
}

const OneCountry = ({country}) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
     <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>

      <h2>Spoken languages</h2>
      <Languages languages = {country.languages} />

      <p><img src = {country.flags.png} height = '100' alt ={`${country.name.common} flag`}/></p>

      {
        Object.keys(weather).length !== 0 &&
        (
          <div>
            <h2>Weather in {country.capital}</h2>
            <div>
              <b>Temperature:</b> {weather.main.temp} Celcius
            </div>
            <div>
              <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} height = '100' alt = {`${country.capital} weather`}/>
            </div>
            <div>
              <b>Wind:</b> {(weather.wind.speed * 2.23694).toFixed(2)} mph direction {<Conversion degree = {weather.wind.deg}/>}
            </div>
          </div>
        )
      }
    </div>
  )
}

const SomeCountries = ({countries}) => {
  return (
    countries.map(country =>
      <CountryName
        key = {Object.keys(country.idd).length !== 0 ? (country.idd.root + country.idd.suffixes[0]) : NaN}
        name = {country.name.common}
        country = {country}
      />
    )
  )
}

const DisplayCountries = ({countries}) => {
  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  else if(countries.length > 1 && countries.length <= 10){
    return (
      <SomeCountries countries = {countries} />
    )
  }

  else if(countries.length == 1) {
    return <OneCountry country = {countries[0]} />
  }

  return <div></div>
}

const App = () => {
  const [filterInput, setFilterInput] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterInput = (event) => {
    setFilterInput(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterInput.toLowerCase()))

  return (
    <div>
      Find countries <input value = {filterInput} onChange = {handleFilterInput}/>
      <DisplayCountries countries = {countriesToShow} />
    </div>
  )
}

export default App;
