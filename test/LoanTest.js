const { expectRevert, time } = require("@openzeppelin/test-helpers");
const truffleAssert = require('truffle-assertions');

const Loan = artifacts.require("Loan.sol");
contract("Loan", (accounts) => {
    let loan; const amount = 1000; const interest = 10; const duration = 100;
    const [borrower, lender] = [accounts[1], accounts[2]];
    before(async () => {
        loan = await Loan.deployed(); //1 
    });

    it("test lend function", async () => {
        //revert condition 1
        await truffleAssert.reverts(
            loan.lend({ from: borrower }),
        )
        //revert condition 2
        await truffleAssert.reverts(
            loan.lend({ from: lender, value: 500 }),
        )
        // const initialBorrowerBal = await loan.getBal();

        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(borrower));

        await truffleAssert.passes(
            loan.lend({ from: lender, value: amount }),
        )

        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(borrower));
        const state = await loan.state(); assert(state.toNumber() == 1);
        assert(balanceAfter.sub(balanceBefore).toNumber() === amount);

        // console.log(Number(balanceBefore));
        // console.log(Number(balanceAfter));

    });
    //     it("should not accept lend amount if not exact amount", async () => { 
    //         await expectRevert( loan.lend({ from: lender, value: 100 }), //3 
    //         "can only lend the exact amount" ); 
    // });

    // it("should accept lend amount", async () => { 
    //     const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(borrower)); //0 
    //     await loan.lend({ from: lender, value: amount }); //1000 //4 
    //     const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(borrower)); //1000 
    //     const state = await loan.state(); assert(state.toNumber() == 1); 
    //     assert(balanceAfter.sub(balanceBefore).toNumber() === amount); //1000-0 ===1000 
    // }); 

    it("test repay function", async () => {
        // revert if not matured. 
        await truffleAssert.reverts(
            loan.repay({from:borrower,value:amount+interest}),
        );

        // increase time
        time.increase(duration);
        // revert if not owner
        await truffleAssert.reverts(
            loan.repay({ from: accounts[3],value:amount+interest }),
        );
        
        // revert if value != amount + interest
        //this test case also fails for value < amount + interest
        // so keep value > amount + interest to test
        await truffleAssert.reverts(
            loan.repay({ from: borrower, value: 1200 }),
        );

        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(lender));

        await truffleAssert.passes(
            loan.repay({ from: borrower, value: amount + interest })
        );

        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(lender));
        
        const state = await loan.state();
        
        assert(state.toNumber() === 2);
        
        assert(balanceAfter.sub(balanceBefore).toNumber() === amount + interest);

    });

    // it("should not repay if not exact amount", async () => { 
    //     // await expectRevert( loan.repay({ from: borrower, value: 50 }), //6 
    //     // "borrower need to repay exactly amount + interest" ); 
    //     try {
    //         await loan.repay({ from: borrower, value: 50 });
    //     } catch (error) {
    //         assert(error,"borrower need to repay exactly amount + interest");
    //     }
    // }); 

    // it("should not repay of loan has not matured", async () => { 
    //     await expectRevert( loan.repay({ from: borrower, value: amount + interest }), //7 
    //     "loan has not matured yet" ); 
    // });

    // it("should repay", async () => { 
    //     time.increase(duration + 10); //33+100+10=143 secs

    // const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(lender));
    // await loan.repay({ from: borrower, value: amount + interest });
    // const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(lender));

    // const state = await loan.state();
    // assert(state.toNumber() === 2);
    // assert(balanceAfter.sub(balanceBefore).toNumber() === amount + interest);
    // }); 
});