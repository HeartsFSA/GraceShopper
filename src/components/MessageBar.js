import React from 'react';
import {useState, useEffect} from 'react';

function MessageBar(props) {
  // message is a string
  // showMessage is a boolean

  const {message} = props;

  if (message) {
    return <div id="message">{message}</div>;
  } else {
    return <></>;
  }
}

export default MessageBar;
