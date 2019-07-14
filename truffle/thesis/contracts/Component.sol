pragma solidity ^0.5.8;

contract Component {

    /* Enum */

    enum Status { CREATED, FUNDING, DEVELOPING, PENDING, APPROVED }


    /* Attributes */

    string          private name;
    string          private requirements;
    string          private description;

    string          private submission;

    address         private initiator;
    address payable private developer;

    Status          private status;


    /* Constructor */

    constructor (string memory _name, string memory _requirements, string memory _description) payable public {

        name            = _name;
        requirements    = _requirements;
        description     = _description;

        initiator       = msg.sender;

        status          = Status.CREATED;
    }


    /* Functions */

    function addFund() payable external  {
        require (getStatus() != Status.APPROVED, "Component already developed!");

        if (getStatus() == Status.CREATED)
            status = Status.FUNDING;
    }

    function registerDeveloper() payable external {
        require (getStatus() == Status.FUNDING, "Developer already registered!");
        require (msg.value >= 1 ether, "Please send one Ether deposit!");

        developer = msg.sender;
        status = Status.DEVELOPING;
    }

    function submitComponent (string calldata _submission) external onlyDeveloper {
        submission  = _submission;
        status      = Status.PENDING;
    }

    function approveComponent (bool _sufficient) external onlyInitiator returns (Status) {
        require (getStatus() == Status.PENDING, "Component isn't pending yet!");

        if (_sufficient) {
            developer.transfer (this.getFund());
            status = Status.APPROVED;
        } else {
            status = Status.DEVELOPING;
        }

        return status;
    }


    /* Getter */

    function getName()          view public returns (string memory)   { return name; }
    function getRequirements()  view public returns (string memory)   { return requirements; }
    function getDescription()   view public returns (string memory)   { return description; }
    function getFund()          view public returns (uint256)         { return address (this).balance; }
    function getSubmission()    view public returns (string memory)   { return submission; }
    function getInitiator()     view public returns (address)         { return initiator; }
    function getDeveloper()     view public returns (address)         { return developer; }
    function getStatus()        view public returns (Status)          { return status; }


    /* Modifier */

    modifier onlyInitiator() {
        require (msg.sender == initiator, "Only the initiator can call this function!");
        _;
    }

    modifier onlyDeveloper() {
        require (msg.sender == developer, "Only the developer can call this function!");
        _;
    }
}