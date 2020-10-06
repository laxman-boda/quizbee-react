import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizservice from "./quizservice";
import QuestionBox from "./componet/questionBox"; 
import Result from "./componet/Result";

class Quizbee extends Component {
    state = {
        questionBank : [],
        score :0,
        responses :0
    };
    getQuestions = () => {
        quizservice().then(question =>{
            this.setState({
                questionBank :question  
            });
        });
    };
    computeAnswer = (answer,correctAnswer) =>{
        if(answer === correctAnswer){
            this.setState({
                score:this.state.score + 1
            });

        }
        this.setState({
            responses:this.state.responses < 5 ?this.state.responses + 1 : 5
        });
    }
    
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score:0,
            responses:0
        });
    };
    componentDidMount(){
        this.getQuestions();
    }
        render(){
        return (
            <div className="container">
            <div className="title">Quizbee</div>
            {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(({question,answers,correct,qustionId})=>
            (<QuestionBox
                question={question}
                options ={answers}
                key ={qustionId}
                selected ={answer => this.computeAnswer(answer,correct)}
                />
                )
                )}
                {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.state.playAgain}/>) : null} 


            </div>

        );
    }
}
ReactDOM.render(<Quizbee/>,document.getElementById("root"));