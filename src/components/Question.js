import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

class Question extends Component {
    render() {
        const {question} = this.props;
        if (question === null) {
            return (<p>This question does not exist</p>)
        }
        return (
            <Link to={`/questions/${question.id}`} className='question'>
                <div>
                    <h4>Would you rather</h4>
                    <ul>
                        <li>{question.optionOne.text}</li>
                        <li>{question.optionTwo.text}</li>
                    </ul>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({questions},{id}){
    const question = questions[id];
    return {
        question: question ? question : null,
    }
}

export default connect(mapStateToProps)(Question)