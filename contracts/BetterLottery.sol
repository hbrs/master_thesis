pragma solidity ^0.5.8;

contract Lottery {

    enum Stage { ONE, TWO, THREE, END }

    struct Commitment {
        bytes32 nonceHash;
        bytes32 noncePlusNumberHash;
        uint256 number;
    }

    uint256 private counter;
    uint256 private winning_number;

    Stage private stage;

    mapping (address => Commitment) private players;

    constructor () public {

        stage = Stage.ONE;

        counter         = 0;
        winning_number  = 0;
    }

    function sendHashedNumber (bytes32 _nonceHash, bytes32 _noncePlusNumberHash) payable external {

        require (stage == Stage.ONE, "Stage ONE isn't active!");
        // require (msg.value >= 0.1 ether, "To enter the game you need to send at least 0.1 ether!");

        players [msg.sender] = Commitment (_nonceHash, _noncePlusNumberHash, 0);

        counter++;

        if (counter == 3) { stage = Stage.TWO; }
    }

    function sendNumber (uint256 _nonce, uint256 _number) external {

        require (stage == Stage.TWO, "Stage TWO isn't active!");
        require (players [msg.sender].nonceHash == keccak256 (abi.encodePacked (_nonce)), "Nonce isn't matching!");
        require (players [msg.sender].noncePlusNumberHash == keccak256 (abi.encodePacked (_nonce + _number)), "Number isn't matching!");
        require (players [msg.sender].number == 0, "You already submitted your number!");

        players [msg.sender].number = _number;

        winning_number = (winning_number ^ _number) % 101;

        counter--;

        if (counter == 0) { stage = Stage.THREE; }
    }

    function claimReward () external view returns (bool _result) {

        require (stage == Stage.THREE, "Stage THREE isn't active!");

        return players [msg.sender].number == winning_number ? true : false;

        // if (true) payout
    }
}