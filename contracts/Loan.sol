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

    constructor ( uint256 _amount, uint256 _interest, uint256 _duration, address payable _borrower, address payable _lender){
        // Set variables here
    }

    function lend() external payable {
           //Write your code here

    }

    function repay() external payable {
           //Write your code here
    }


   
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


