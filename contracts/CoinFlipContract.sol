// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract CoinFlipContract {
    uint256 public balance;

    constructor() public payable {
        balance = msg.value;
    }

    event betWon();

    function depositFunds() public payable {
        require(msg.value > 0);

        balance += msg.value;
    }

    function getContractBalance() public view returns (uint256) {
        return balance;
    }

    function withdraw(uint256 amount) public payable {
        require(amount < balance);
        balance -= amount;
        msg.sender.transfer(amount);
    }

    function withdrawAll() public payable {
        balance = 0;
        msg.sender.transfer(address(this).balance);
    }

    function makeBet(uint256 coinSide) public payable {
        depositFunds();

        if (coinSide == random()) {
            withdraw(msg.value * 2);
            emit betWon();
        }
    }

    function random() public view returns (uint256) {
        return block.timestamp % 2;
    }
}
