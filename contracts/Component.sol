pragma solidity ^0.5.6;

contract Component {

    string private name;
    string private requirements;
    string private description;

    mapping (address => uint) private founders;
    mapping (address => bool) private developers;

    constructor (string memory _name, string memory _requirements, string memory _description) public payable {

        name            = _name;
        requirements    = _requirements;
        description     = _description;

        addFund ();
    }


    /* Functions */

    function addFund ()         public payable  { founders [msg.sender] = msg.value; }
    function addDeveloper ()    external        { developers [msg.sender] = false; }


    /* Setter & Getter */

    function getName ()         external view returns (string memory) { return name; }
    function getRequirements () external view returns (string memory) { return requirements; }
    function getDescription ()  external view returns (string memory) { return description; }
    function getQuotation ()    external view returns (uint256)       { return address(this).balance; }
}