import React from 'react';
import {useState, useEffect} from 'react';

function MessageBar(props) {
  const {message, setMessage} = props;

  if (message) {
    return <div id="message">{message}</div>;
  } else {
    return <></>;
  }
}

export default MessageBar;
