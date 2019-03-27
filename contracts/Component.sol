pragma solidity ^0.5.6;

contract Component {

    string          private name;
    string          private requirements;
    string          private description;

    address         private founder;
    address payable private developer;

    bool            private approved;

    // mapping (address => uint) private founders;
    // mapping (address => bool) private developers;


    constructor (string memory _name, string memory _requirements, string memory _description) payable public {

        name            = _name;
        requirements    = _requirements;
        description     = _description;

        founder         = msg.sender;

        approved        = false;
    }


    /* Functions */

    // function addFund ()         payable public  { founders [msg.sender] = msg.value; }
    // function addDeveloper ()    external        { developers [msg.sender] = false; }


    /* Setter & Getter */

    function getName ()         view external returns (string memory)   { return name; }
    function getRequirements () view external returns (string memory)   { return requirements; }
    function getDescription ()  view external returns (string memory)   { return description; }
    function getFund ()         view external returns (uint256)         { return address (this).balance; }

    function getFounder ()      view external returns (address)         { return founder; }
    function getDeveloper ()    view external returns (address)         { return developer; }

    function isApproved ()      view external returns (bool)            { return approved; }


    function setDeveloper () payable external {

        require (developer == address (0), "Developer already set!");
        require (msg.value >= 1 ether, "Please send one Ether deposit!");

        developer = msg.sender;
    }

    function setApproved () external onlyFounder {

        // require (msg.sender == founder, "Only founder can approve this component!");
        require (!this.isApproved (), "Component already approved!");
        require (developer != address (0), "No developer set yet!");

        developer.transfer (this.getFund ());

        approved = true;
    }


    /* Modifier */

    modifier onlyFounder () {
        require (msg.sender == founder, "Only founder!");
        _;
    }
}