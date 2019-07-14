pragma solidity ^0.5.8;


// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
library SafeMath {

    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require (c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) {
        require (b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require (a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) {
        require (b > 0);
        c = a / b;
    }
}

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
// ----------------------------------------------------------------------------
contract ERC20Interface {

    function totalSupply    ()                          public view returns (uint);
    function balanceOf      (address tokenOwner)        public view returns (uint balance);
    function transfer       (address to, uint tokens)   public      returns (bool success);

    event Transfer (address indexed from, address indexed to, uint tokens);
}

// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {

    address public owner;
    address public newOwner;

    event OwnershipTransferred (address indexed _from, address indexed _to);

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership (address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }

    function acceptOwnership () public {

        require(msg.sender == newOwner);

        emit OwnershipTransferred(owner, newOwner);

        owner = newOwner;
        newOwner = address(0);
    }
}

// ----------------------------------------------------------------------------
// ERC20 Token, with the addition of symbol, name and decimals and a
// fixed supply
// ----------------------------------------------------------------------------
contract SimpleToken is ERC20Interface, Owned {

    using SafeMath for uint;

    string  public  symbol;
    string  public  name;
    uint8   public  decimals;
    uint            _totalSupply;

    mapping (address => uint) balances;


    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {

        symbol = "STK";
        name = "Simple Token";
        decimals = 18;
        _totalSupply = 1000;
        balances [owner] = _totalSupply;

        emit Transfer(address(0), owner, _totalSupply);
    }


    // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public view returns (uint) {
        return _totalSupply.sub(balances[address(0)]);
    }


    // ------------------------------------------------------------------------
    // Get the token balance for account `tokenOwner`
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }


    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {

        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);


        emit Transfer(msg.sender, to, tokens);

        return true;
    }


    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function() external payable {
        revert();
    }


    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }
}