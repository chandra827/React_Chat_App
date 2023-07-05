import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Avatar } from "@mui/material";

// List of users
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatComponent = () => {
  // State variables
  const [messages, setMessages] = useState([]); // Array of chat messages
  const [inputValue, setInputValue] = useState(""); // Input value of the chat input field
  const [showPicker, setShowPicker] = useState(false); // Flag to show/hide the emoji picker
  const [showUserList, setShowUserList] = useState(false); // Flag to show/hide the user list
  const messagesEndRef = useRef(null); // Reference to the end of the chat body for scrolling
  const [mentionIndex, setMentionIndex] = useState(0); // Index to handle user mentions

  // Handler for input field change event
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for emoji click event
  const onEmojiClick = (e) => {
    // Convert the selected emoji to a unicode string and append it to the input value
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInputValue((prev) => prev + emoji);
  };

  // Handler for like button click event
  const handleLikeClick = (index) => {
    // Increment the like count of the selected message
    const updatedMessages = [...messages];
    updatedMessages[index].likeCount += 1;
    setMessages(updatedMessages);
  };

  // Handler for key press event in the input field
  const handleInputKeyPress = (e) => {
    if (e.key === "@") {
      // If "@" is pressed, show the user list and set the mention index
      setShowUserList(true);
      setMentionIndex(inputValue.length);
    }
    if (e.key === "Backspace") {
      // If backspace is pressed, hide the user list
      setShowUserList(false);
    }
  };

  // Handler for user click event in the user list
  const handleUserClick = (user) => {
    // Append the selected user to the input value and hide the user list
    setInputValue(inputValue + `${user} `);
    setShowUserList(false);
  };

  // Function to scroll to the bottom of the chat body
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler for send button click event
  const handleSendClick = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      // Create a new message object with a random user and the input value
      const randomUser =
        user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser,
        text: inputValue.trim(),
        likeCount: 0,
      };
      // Add the new message to the messages array, clear the input value, and hide the emoji picker
      setMessages([...messages, newMessage]);
      setInputValue("");
      setShowPicker(false);
    }
  };

  // Scroll to the bottom of the chat body when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat">
      {/* Chat header */}
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3> Introductions </h3>
          <p> This Channel Is For Company Wide Chatter</p>
        </div>
      </div>

      {/* Chat body */}
      <div className="chat_body">
        {/* Render each message */}
        {messages.map((message, index) => (
          <div className="chat_like" key={index}>
            <p className="chat_message">
              {/* Render the user name and timestamp */}
              <span className="chat_name">
                {`${message.user}`}{" "}
                <span className="chat_timestamp">
                  {new Date().getHours()}:{new Date().getMinutes()}
                </span>
              </span>
              {/* Render the message text */}
              {`${message.text}`}
            </p>
            {/* Render the like button and count */}
            {<ThumbUpOffAltIcon onClick={() => handleLikeClick(index)} />}{" "}
            {message.likeCount}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji picker */}
      {showPicker && (
        <EmojiPicker height={500} width={400} onEmojiClick={onEmojiClick} />
      )}

      {/* User list */}
      {showUserList && (
        <div className="user-list" style={{ position: "relative" }}>
          {/* Render each user */}
          {user_list.map((user, index) => (
            <div
              key={index}
              onClick={() => handleUserClick(user)}
              style={{
                cursor: "pointer",
              }}
            >
              {user}
            </div>
          ))}
        </div>
      )}

      {/* Chat footer */}
      <div className="chat_footer">
        {/* Emoji picker toggle */}
        <InsertEmoticonIcon onClick={() => setShowPicker(!showPicker)} />

        {/* Chat input form */}
        <form>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
            placeholder="Type your message..."
          />

          {/* Send button */}
          <button type="submit" onClick={handleSendClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
