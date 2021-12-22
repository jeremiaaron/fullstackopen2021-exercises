const Conversion = ({degree}) => {
    degree = degree % 360
    
    if (11.25 <= degree && degree < 33.75) return "NNE"
    else if (33.75 <= degree && degree < 56.25) return "NE"
    else if (56.25 <= degree && degree < 78.75) return "ENE"
    else if (78.75 <= degree && degree < 101.25) return "E"
    else if (101.25 <= degree && degree < 123.75) return "ESE"
    else if (123.75 <= degree && degree < 146.25) return "SE"
    else if (146.25 <= degree && degree < 168.75) return "SSE"
    else if (168.75 <= degree && degree < 191.25) return "S"
    else if (191.25 <= degree && degree < 213.75) return "SSW"
    else if (213.75 <= degree && degree < 236.25) return "SW"
    else if (236.25 <= degree && degree < 258.75) return "WSW"
    else if (258.75 <= degree && degree < 281.25) return "W"
    else if (281.25 <= degree && degree < 303.75) return "WNW"    
    else if (303.75 <= degree && degree < 326.25) return "NW"    
    else if (326.25 <= degree && degree < 348.75) return "NNW"    
    else return "N"
}

export default Conversion