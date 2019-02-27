pragma solidity >=0.4.22 <0.6.0;

contract Lottery {

    event ePlay(bool result, uint256 jackpot);

    address private owner;
    address private winner;

    bytes32 private winning_number_hash;

    constructor (bytes32 _winning_number_hash) payable public {
        owner               = msg.sender;
        winning_number_hash = _winning_number_hash;
    }

    function play (string memory _value) payable public {
        require (this.isOpen(), "The lottery is over!");
        //require (_value <= 100);
        require (msg.value >= 0.01 ether, "To enter the game you need to send at least 0.01 ether!");
        require (owner != msg.sender, "Owner isn't allowed to play!");

        if (winning_number_hash == keccak256(abi.encodePacked(_value))) {

            // payout winner
            msg.sender.transfer (this.getJackpot());

            // set winner
            winner = msg.sender;

            // emit event
            emit ePlay (true, this.getJackpot());

            return;
        }

        emit ePlay (false, this.getJackpot());
    }

    function isOpen () view public returns (bool) {
        return winner == address(0);
    }

    function getJackpot () view public returns (uint256) {
        return address(this).balance;
    }
}