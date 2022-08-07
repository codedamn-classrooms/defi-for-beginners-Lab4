//SPDX-License-Identifier: UNLICENSED 
pragma solidity >=0.5.0 <0.9.0;

contract Loan {

    enum State { 
        NOT_ACTIVE,
        ACTIVE,
        CLOSED }



    State public state = State.NOT_ACTIVE;
    address payable public borrower;
    address payable public lender;
    uint256 public amount;
    uint256 public interest;
    uint256 public duration;
    uint256 public end;

   //Create constructor
   
   
   //Create lend function
   
   
   //Create repay function

<<<<<<< HEAD
    function repay() external payable {
        require(msg.sender == borrower, " Only borrower can repay");
       require( msg.value == amount+interest, " borrower needs to repay exactly, amount + interest");
=======
   
>>>>>>> ddf0e9cec15daf6c7451aadd8c0f7d3007ad01e6

   

    function changeState( State _state) internal{
         require(_state != State.NOT_ACTIVE, "state is already inactive");
         require(_state != state, " transition state cannot be same");

         if(_state == State.ACTIVE){
                require(state== State.NOT_ACTIVE," state should be inactive first");
             state= State.ACTIVE;
             end = block.timestamp + duration;
         }

         if(_state == State.CLOSED){
             require(state == State.ACTIVE, " state should be active first");
             require(block.timestamp >= end, " loan has not matured yet");
             state= State.CLOSED;
         }

    }



}

