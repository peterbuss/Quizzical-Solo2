import React from 'react'


export default function ScorePage(props) {
    
    const buttonStyle_0 = {
        backgroundColor: (props.right_answer_i===0) ? 
        "#59E391" : ((props.selected_0) && (props.right_answer_i!==0)) ?
        "#F8BCBC" : "white"
    }
    const buttonStyle_1 = {
        backgroundColor: (props.right_answer_i===1) ? 
        "#59E391" : ((props.selected_1) && (props.right_answer_i!==1)) ?
        "#F8BCBC" : "white"
    }
    const buttonStyle_2 = {
        backgroundColor: (props.right_answer_i===2) ? 
        "#59E391" : ((props.selected_2) && (props.right_answer_i!==2)) ?
        "#F8BCBC" : "white"
    }
    const buttonStyle_3 = {
        backgroundColor: (props.right_answer_i===3) ? 
        "#59E391" : ((props.selected_3) && (props.right_answer_i!==3)) ?
        "#F8BCBC" : "white"
    }

    // #F8BCBC light red from figma

    return(
        <div>            
            <p className="question">{props.question}</p>
            <button className="buttons" style={buttonStyle_0}>
                {props.answers[0]}</button>
            <button className="buttons" style={buttonStyle_1}>
                {props.answers[1]}</button>
            <button className="buttons" style={buttonStyle_2}>
                {props.answers[2]}</button>
            <button className="buttons" style={buttonStyle_3}>
                {props.answers[3]}</button>
        </div>
    )
}


