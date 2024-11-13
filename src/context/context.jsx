import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(""); // State for the most recent prompt
  const [prevPrompt, setPrevPrompt] = useState([]); // State for storing previous prompts
  const [showresult, setShowresult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");   

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = ()=>{
    setLoading(false)
    setShowresult(false)
  }
  // onSent function for sending the input
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowresult(true);
    let response;

    if (prompt !== undefined) {
      response = await run(prompt); // Send prompt to backend for response
    } else {
      setPrevPrompt(prev => [...prev, input]); // Save current input to prevPrompt list
      response = await run(input); // Send input to backend for response
    }

    setRecentPrompt(prompt); // Update recentPrompt with current or selected prompt
    setPrevPrompt(prev => [...prev, prompt]); // Add the selected prompt to prevPrompt

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    onSent,
    prevPrompt,
    setPrevPrompt,
    setRecentPrompt,
    recentPrompt, 
    showresult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
