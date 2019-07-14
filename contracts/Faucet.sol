pragma solidity ^0.5.8;

contract Faucet {

    function requestEther (address payable _receiver) payable external {

        require (this.etherLeft () >= 1 ether, "No ether left to give away!");

        _receiver.transfer (1 ether);
    }

    function etherLeft () view external returns (uint256) {
        return address (this).balance;
    }

    function getBalance (address _receiver) view external returns (uint256) {
        return _receiver.balance;
    }

    function () payable external {}
}