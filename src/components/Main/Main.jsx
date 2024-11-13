import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    // Destructure onSent, recentPrompt, and other values from Context
    const { onSent, recentPrompt, showresult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user" />
            </div>
            <div className="container">
                {!showresult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, User</span></p>
                            <p>How can I help you today?</p>
                        </div>
                      
                    </>
                    : <div className='result'>
                        <div className="r-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p> {/* Display the prompt */}
                        </div>
                        <div className="data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                  </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search">
                        <input
                            onChange={(e) => setInput(e.target.value)}  // Update the input state as user types
                            value={input}  // Bind the input value to state
                            type="text"
                            placeholder='Ask Gemini'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                           {input?<img onClick={() => onSent(input)} src={assets.send_icon} alt="" /> :null} {/* Pass the input to onSent */}
                        </div>
                    </div>
                    <p className="info">Current Input: {input}</p> {/* Display the current input here */}
                </div>
            </div>
        </div>
    );
};

export default Main;
