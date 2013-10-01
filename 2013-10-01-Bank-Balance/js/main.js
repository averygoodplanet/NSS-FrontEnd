$(document).ready(initialize);

var balance = 1000;

function deposit(balance, deposit_amount){
  balance = balance + deposit_amount;
  return balance;
}

function withdrawal(balance, withdrawal_amount){
  balance = balance - withdrawal_amount;
  return balance;
}

function initialize(){

}