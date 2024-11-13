import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt); // Just pass the prompt to onSent and let it handle updating the state
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="menu" />
        <div onClick={()=>newChat()} className="chat">
          <img src={assets.plus_icon} alt="new chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended && (
          <div className="recent">
            <p className='recent-t'>Recent</p>
            {prevPrompt.map((item, index) => {
              // Ensure item is a string before calling slice
              if (typeof item === 'string') {
                return (
                  <div key={index} onClick={() => loadPrompt(item)} className="recent-e">
                    <img src={assets.message_icon} alt="recent message" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              }
              return null; // If item is not a valid string, skip it
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="b-item recent-e">
          <img src={assets.question_icon} alt="help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="b-item recent-e">
          <img src={assets.history_icon} alt="activity" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="b-item recent-e">
          <img src={assets.setting_icon} alt="settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
