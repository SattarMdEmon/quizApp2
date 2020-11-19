import React from 'react';
import './result.style.css'

const Result = ({questions, answers}) => {
    console.log(questions);
    return (
        <div>
            <div className="answerArea">
{            questions.map((question, index) => {
                return <div className="result">
                <h1 className="question">{question["Questions"]}</h1>
                {/* A */}
                {
                    question["Answer"] === "A"?<h2 className="option A green">{question["OptionA"]}</h2>:answers[index] === "A"?<h2 className="option A red">{question["OptionA"]}</h2>:<h2 className="option A">{question["OptionA"]}</h2>
                }

                {/* B */}
                {
                    question["Answer"] === "B"?<h2 className="option B green">{question["OptionB"]}</h2>:answers[index] === "B"?<h2 className="option B red">{question["OptionB"]}</h2>:<h2 className="option B">{question["OptionB"]}</h2>
                }

                {/* C */}
                {
                    question["Answer"] === "C"?<h2 className="option C green">{question["OptionC"]}</h2>:answers[index] === "C"?<h2 className="option C red">{question["OptionC"]}</h2>:<h2 className="option C">{question["OptionC"]}</h2>
                }

                {/* D */}
                {
                    question["Answer"] === "D"?<h2 className="option D green">{question["OptionD"]}</h2>:answers[index] === "D"?<h2 className="option D red">{question["OptionD"]}</h2>:<h2 className="option D">{question["OptionD"]}</h2>
                }

                {/* E */}
                {
                    question["Answer"] === "E"?<h2 className="option E green">{question["OptionE"]}</h2>:answers[index] === "E"?<h2 className="option E red">{question["OptionE"]}</h2>:<h2 className="option E">{question["OptionE"]}</h2>
                }
                </div>
            })}
            </div>
        </div>
    );
}

export default Result;
