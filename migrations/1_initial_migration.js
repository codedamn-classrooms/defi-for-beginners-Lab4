const Loan = artifacts.require("Loan");

module.exports =async function (deployer,accounts) {
  console.log(accounts[1])
  await deployer.deploy(Loan,1000, 10, 100, accounts[1], accounts[2]);
};
