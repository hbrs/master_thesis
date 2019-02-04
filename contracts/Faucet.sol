pragma solidity >=0.4.22 <0.6.0;

contract Faucet {

    constructor () payable public {}

    function requestEther (address payable _receiver) payable public {

        require (this.etherLeft() >= 1 ether, "No ether left to give away!");

        _receiver.transfer (1 ether);
    }

    function etherLeft () view public returns (uint256) {
        return address(this).balance;
    }

    function getBalance (address _receiver) view public returns (uint256) {
        return _receiver.balance;
    }
}