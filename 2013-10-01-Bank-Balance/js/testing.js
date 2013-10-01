test("deposit function", function(){
  deepEqual(deposit(1000, 250), 1250, "Depositing 250 to original balance of 1000");
});

test("withdrawal function", function(){
  deepEqual(withdrawal(1000, 250), 750, "Withdrawing 250 from original balance 1000");
});