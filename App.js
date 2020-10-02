import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
// .orderBy('timestamp', 'desc')
// npm install -g firebase-tools
// firebase login
// firebase init
// timestamp: firebase.firestore.FieldValue.serverTimestamp()

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

    useEffect(() =>{
      db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,  
          message: doc.data()
        })))
      });
    },[])



  useEffect(() => {
    //runcode here 
    
    setUsername(prompt('Please evter your name(名前を入力してください）'))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message:input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    

    // setMessages([...messages, {username:username, message:input}])
    setInput('');
  }

  return (
    <div className="App">
      <img src="data:image/jpeg;base64,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" alt=""/>
      <h3>メッセンジャークロン！(Messenger Clone with React!)</h3>
      <h2>Welcome {username}</h2>
      <form className="app__form">
      <FormControl className="formControl">
        <InputLabel >Enter a message...</InputLabel>
        <Input
        className="input" 
        placeholder='Enter a message...'
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}  />
         <IconButton
         className="iconButton" 
        disabled={!input} 
        variant="contained" 
        color="primary" 
        type='submit' 
        onClick={sendMessage}>
          <SendIcon />
        </IconButton> 
      </FormControl>
    </form>
    <FlipMove>
     {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          
          ))
        }
    </FlipMove>
    </div>
    
  );
}

export default App;
