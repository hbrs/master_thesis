pragma solidity ^0.5.8;

import "./Ownable.sol";

contract Course is Ownable {

    enum Status { REQUESTED, APPROVED/*, REJECT*/ }


    string  private name;

    Status  private status;

    struct Certificate {
        string  submission;
        uint256 requested;
        uint256 issued;
        Status  status;
    }

    mapping (address => Certificate) private graduates;

    constructor (string memory _name) public {
        name = _name;
    }

    function certificateRequest (string calldata _submission) external {
        graduates [msg.sender] = Certificate (_submission, block.timestamp, 0, Status.REQUESTED);
    }

    function certificateApprove (address _graduate) external onlyOwner returns (bool) {

        if (graduates [_graduate].status != Status.APPROVED) {
            graduates [_graduate].issued = block.timestamp;
            graduates [_graduate].status = Status.APPROVED;

            return true;
        }

        return false;
    }

    function getName() view external returns (string memory) {
        return name;
    }

    function getCertificate (address _graduate)
        view external returns (string memory, uint256, uint256, Status) {

        return (
            graduates [_graduate].submission,
            graduates [_graduate].requested,
            graduates [_graduate].issued,
            graduates [_graduate].status
        );

    }
}