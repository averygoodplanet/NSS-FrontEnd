'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  var o = {};

  // when this uncaught exception (y undefined) occurs, it stops the whole program

  // console.log(y);

  //because this error (b undefined) is in a try-catch block,
  //the programs continues.
  try {
    console.log(b);
  } catch (error) {
    console.log('just received the error: '+error);
  }

  //when this uncaught exception (method doesntExist is undefined) occurs,
  //it stops the whole program.
  //o.doesntExist();

  //wrapping in a try-catch allows the program to continue past the error.
  try {
    o.doesntExist();
  } catch(error) {
    console.log('you just received the error: '+ error);
  }

  console.log('I have reached the end of this function.');
}
