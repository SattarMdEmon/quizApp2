import React, { Component } from 'react'
import './layout.style.css'
import questionBank from '../data/questionBank'
import Result from './result.component'


class Layout extends Component {
    constructor(props) {
        super(props)
        this.state= {
            originalMinute: 50,
            originalSecond: 0,
            minute: 50,
            seconds:0,
            questions: [],
            timePerQues: 60,
            totalQues: 249,
            questionSet: {
                Basic: 28,
                Audit: 40,
                Monitoring: 48,
                Compliance: 19,
                AML: 25,
                IT: 40,
                HR: 24,
                Legal: 25
            },

            // setup
            quizBegin: false,
            quizEnd: false,
            currentQ: 0,
            score: 0,
            answers: []
        }
    }

     componentDidMount() {
        
        // this.nextQuestion(1);
    }

     startQuiz = async (e) =>{

        e.preventDefault();

        const total = e.target.firstElementChild.value;
        const minutes = e.target.querySelector('#minutes').value;

        console.log(minutes);

        if (minutes >0){
            this.setState({
                minute: minutes
            })
        }

        if (total > 0 && total <250) {
            this.setState({
                totalQues: total
            })
        }



        const tempQuestions = await this.getQuestions();
        this.setState({
            questions: tempQuestions,
            quizBegin: true,
            quizEnd: false
        })
        console.log(this.state.questions);
        this.timer();
    }



    // Functions

     getQuestions = async () => {
        // get random value
        let tempQuestions = [];
        let questionSet = this.state.questionSet;

        
        for (const key in questionSet) {
            let x = [];
            while (x.length < questionSet[`${key}`]) {
                let rand = Math.floor(Math.random() * Math.floor(questionBank[`${key}`].length))
                // console.log(rand);
                let q = questionBank[`${key}`][rand];
                // console.log(q);
                if (x.indexOf(q) === -1) {
                    x.push(q);
                    // console.log(tempQuestions);
                }
            }
            tempQuestions = tempQuestions.concat(x);
        }
        
        
        tempQuestions = this.shuffle(tempQuestions);

        return tempQuestions;

    }

    // Shuffle Function
    shuffle = (array)=> {
        var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
    }
    
    submit = (e) => {
        console.log(e.target.id)

        let temAns = this.state.answers;
        temAns.push(e.target.id)

        this.setState({
            answers: temAns
        })

        if (e.target.id === this.state.questions[this.state.currentQ]["Answer"]){
            
            this.setState({
                score: this.state.score+1
            }, this.nextQuestion)
        }
        else {
            this.nextQuestion();
        }

    }

    nextQuestion = () => {
        if (this.state.currentQ < this.state.totalQues -1 ){
            this.setState({
                currentQ: this.state.currentQ + 1
            })
        } else {
            this.setState({
                quizBegin: false,
                quizEnd: true,
                minute: 49,
                seconds:60,
            })
        }
    }

    


    timer = () => {
       const myTimer = setInterval(() => {
           if (this.state.quizBegin === false) {
               clearInterval(myTimer);
               this.setState({
                   minute: this.state.originalMinute,
                   seconds: this.state.originalSecond
               })
           }
            this.setState({
                seconds: this.state.seconds - 1
            }, ()=>{
                if( this.state.minute === 0 && this.state.seconds === 0) {
                    clearInterval(myTimer)
                    this.setState({
                      quizEnd: true,
                      quizBegin: false  
                    })
                };
            })

            if (this.state.seconds < 0){
                this.setState({
                    minute: this.state.minute -1,
                    seconds: 59
                })

            }
        }, 1000);

        
    }


    render() {
        return (
            <div className="container">
                <div className="heading">
                    <h1 className="title">Practice Quiz App</h1>
                </div>
                <div className="quizContainer">
                <div id="quizArea">
                    {this.state.quizBegin === false? 
                    
                    <form action="#" onSubmit={this.startQuiz}> <input placeholder="Total Number of Question" className = "input" type="number" name="totalQue" id="totalQue"/> 
                    <input placeholder="Minutes" className = "input" type="number" name="minutes" id="minutes"/>
                    <button type="submit">Start Quiz</button> </form> : <div>
                        <h4>{this.state.currentQ + 1}/{this.state.totalQues} Questions</h4>
                        <h1 className="question">{this.state.questions[this.state.currentQ]["Questions"]}</h1>
                        <h2 className="answer A" id="A" onClick={this.submit}>{this.state.questions[this.state.currentQ]["OptionA"]}</h2>
                        <h2 className="answer B" id="B" onClick={this.submit}>{this.state.questions[this.state.currentQ]["OptionB"]}</h2>
                        <h2 className="answer C" id="C" onClick={this.submit}>{this.state.questions[this.state.currentQ]["OptionC"]}</h2>
                        <h2 className="answer D" id="D" onClick={this.submit}>{this.state.questions[this.state.currentQ]["OptionD"]}</h2>
                        {this.state.questions[this.state.currentQ]["OptionE"]? <h2 className="answer C" id="E" onClick={this.submit}>{this.state.questions[this.state.currentQ]["OptionE"]}</h2>:null}

                    </div> }
                    
                </div>

                {this.state.quizEnd===true? <div className="timeArea">
                <h1 className="score">Your Score: {this.state.score}</h1>
                </div> :<div className="timeArea">
                    <h1 id="minute">{this.state.minute}m </h1> 
                    <h1 id="second">{this.state.seconds}s</h1> 
                </div>}

                </div>
                <div className="resultArea">
                    {this.state.quizEnd === true?<Result questions = {this.state.questions} answers ={this.state.answers}/>:null}
                </div>
            </div>
        )
    }
}


export default Layout;