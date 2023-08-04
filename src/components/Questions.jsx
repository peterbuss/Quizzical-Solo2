import React from 'react'


export default function Question(props) {

    
    const buttonStyle_0 = {
        backgroundColor: props.selected_0 ? "#59E391" : "white"
    }
    const buttonStyle_1 = {
        backgroundColor: props.selected_1 ? "#59E391" : "white"
    }
    const buttonStyle_2 = {
        backgroundColor: props.selected_2 ? "#59E391" : "white"
    }
    const buttonStyle_3 = {
        backgroundColor: props.selected_3 ? "#59E391" : "white"
    }


    return(
        <div>            
            <p className="question">{props.question}</p>
            <button onClick={props.select_0} className="buttons" style={buttonStyle_0}>
                {props.answers[0]}</button>
            <button onClick={props.select_1} className="buttons" style={buttonStyle_1}>
                {props.answers[1]}</button>
            <button onClick={props.select_2} className="buttons" style={buttonStyle_2}>
                {props.answers[2]}</button>
            <button onClick={props.select_3} className="buttons" style={buttonStyle_3}>
                {props.answers[3]}</button>
        </div>
    )
}


