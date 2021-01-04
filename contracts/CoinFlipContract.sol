// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract CoinFlipContract {
    address private owner;
    uint256 private contractBalance;
    mapping(address => uint256) private balances;

    constructor() public payable {
        contractBalance = msg.value;
        owner = msg.sender;
    }

    event betWon();

    function depositFunds() public payable {
        require(msg.value > 0);
        contractBalance += msg.value;
    }

    function getAvailableContractBalance() public view returns (uint256) {
        return contractBalance;
    }

    function getTotalContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawContractBalance(uint256 amount) public payable {
        require(
            msg.sender == owner,
            "Only contract owner can withdraw contract funds!"
        );
        require(
            amount > 0 && amount <= contractBalance,
            "Withdraw declined! Withdrawal amount must be between zero and contract balance."
        );
        contractBalance -= amount;
        msg.sender.transfer(amount);
    }

    function getPlayerBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function withdrawPlayerBalance(uint256 amount) public payable {
        uint256 playerBalance = balances[msg.sender];
        require(
            playerBalance > 0,
            "Withdraw declined! Balance must be greather than zero."
        );
        require(
            amount > 0 && amount <= playerBalance,
            "Withdraw declined! Withdrawal amount must be between zero and player balance."
        );
        balances[msg.sender] = playerBalance - amount;
        msg.sender.transfer(amount);
    }

    function makeBet() public payable {
        require(msg.value < (contractBalance / 4));
        depositFunds();
        if (random() == 1) {
            uint256 payout = msg.value * 2;
            balances[msg.sender] += payout;
            contractBalance -= payout;
            emit betWon();
        }
    }

    function random() public view returns (uint256) {
        return block.timestamp % 2;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}
