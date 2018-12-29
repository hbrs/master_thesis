# Solidity

## Table of contents

* 01: Pragma
* 02: Contract
* 03: 256-bit unsigned integer
	* 03.1: uint with less bits
* 04: Arrays
* 05: Functions
* 06: keccak256
* 07: Events
* 08: Mapping
* 09: Structures
* 10: msg.sender
* 11: Require
* 12: Contract Inheritance
* 13: Storage vs Memory
* 14: Function Visibility (may mereg with functions)
* 15: Interacting with other contracts (Interfaces)
* 16: Handling Multiple Return Values
* 17: Own Modifier
* 18: Time units
* 19: Passing structs as arguments
* 20: Save Gas
* 21: Security

### 01: Pragma
    pragma solidity ^0.4.19;

### 02: Contract
    contract MyContract {}

### 03: 256-bit unsigned integer
    uint integer; (same as uint256)

#### 03.1: uint with less bits
    uint8, uint16, uint32, ...

### 04: Arrays

There are two types of arrays in Solidity: fixed arrays and dynamic arrays:

    uint[2] fixedArray;
    uint[] dynamicArray;

### 05: Functions (view, pure, payable, ...)
Function arguments start with a `_`. There are modifiers `view`, `pure`. Multiple returns are possible (unlike in other languages).

`view` means read-only. `pure` didn't even read.

And as with function parameters, it's convention to start private function names with an underscore `_`.

	function _f (uint _i, ...)
		[private | internal | external | public]
		[pure | view | payable | ...]
		[mod]
		returns(uint, ...);

### 06: keccak256

Ethereum has the hash function keccak256 built in, which is a version of SHA3.

_Note_: Secure random-number generation in blockchain is a very difficult problem.

    uint rand = uint(keccak256(_str));

### 07: Events
    event NewEvent(uint someEventDataForTheFrontend);

    NewEvent(_someEventDataForTheFrontend);

### 08: Mapping
    mapping (address => uint) public myMapping;

### 09: Structures

    struct {
      uint integer;
      string some_string;
      bool boolean;
      address someAddress;
    }

### 10: msg.sender
`msg.sender` refers the caller of the contract.

__From the docu:__ In Solidity, there are certain global variables that are available to all functions. One of these is `msg.sender`, which refers to the address of the person (or smart contract) who called the current function.

__Note:__ In Solidity, function execution always needs to start with an external caller. A contract will just sit on the blockchain doing nothing until someone calls one of its functions. So there will always be a `msg.sender`!

### 11: Require
	require(keccak256(_name) == keccak256("Vitalik"));

`require` makes it so that the function will throw an error and stop executing if some condition is not true.

### 12: Contract Inheritance
	contract Doge {
	  function catchphrase() public returns (string) {
	    return "So Wow CryptoDoge";
	  }
	}
	
	---
	
	import "./Dog.sol";
	
	contract BabyDoge is Doge {
	  function anotherCatchphrase() public returns (string) {
	    return "Such Moon BabyDoge";
	  }
	}

### 13: Storage vs Memory

`Storage` refers to variables stored permanently on the blockchain. `Memory` variables are temporary, and are erased between external function calls to your contract. Think of it like your computer's hard disk vs RAM.

Most of the time you don't need to use these keywords because Solidity handles them by default. `State` variables (variables declared outside of functions) are by default storage and written permanently to the blockchain, while variables declared inside functions are `memory` and will disappear when the function call ends.

There are cases where you'll need to explicitly declare storage or memory!

	struct Person { string name; }
	Person[] persons;
	
	function someFunction(uint _index) public {
	
		// `p_storage` is a pointer to persons[_index]
		Person storage p_storage = persons[_index];
		p_storage.name = "Jon Dow";
		
		// `p_memory` is a copy of persons[_index] and will be discard after the function ends
		Person memory p_memory = persons[_index];
		p_memory.name = "Jon Doe";
		persons[_index] = p_memory.name;
	}

### 14: Function Visibility (may merge with functions)

- public
- private
- internal (same as protected)
- external

private -> internal -> external -> public

In addition to `public` and `private`, Solidity has two more types of visibility for functions: `internal` and `external`.

`internal` is the same as `private`, except that it's also accessible to contracts that inherit from this contract.

`external` is similar to `public`, except that these functions can ONLY be called outside the contract — they can't be called by other functions inside that contract.

We have visibility modifiers that control when and where the function can be called from: private means it's only callable from other functions inside the contract; internal is like private but can also be called by contracts that inherit from this one; external can only be called outside the contract; and finally public can be called anywhere, both internally and externally.

We also have state modifiers, which tell us how the function interacts with the BlockChain: view tells us that by running the function, no data will be saved/changed. pure tells us that not only does the function not save any data to the blockchain, but it also doesn't read any data from the blockchain. Both of these don't cost any gas to call if they're called externally from outside the contract (but they do cost gas if called internally by another function).

Then we have custom modifiers like onlyOwner and aboveLevel, for example. For these we can define custom logic to determine how they affect a function.

### 15: Interacting with other contracts (Interfaces)

__Intafaces:__

- Cannot inherit other contracts or interfaces.
- Cannot define constructor.
- Cannot define variables.
- Cannot define structs.
- Cannot define enums.

Example:

	contract LuckyNumber {
		mapping(address => uint) numbers;
	
		function setNum(uint _num) public {
	  		numbers[msg.sender] = _num;
		}
	
		function getNum(address _address) public view returns (uint) {
	  		return numbers[_address];
		}
	}
	
	---
	
	interface NumberInterface {
		function getNum(address _myAddress) public view returns (uint);
	}
	
	---
	
	contract MyContract {
		// The address of the FavoriteNumber contract on Ethereum
		address NumberInterfaceAddress = 0xab38... 
		
		// Now `numberContract` is pointing to the other contract
		NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);
	
		// Now we can call `getNum` from that contract:
		function someFunction() public {
			// ...and do something with `num` here
			uint num = numberContract.getNum(msg.sender);
		}
	}

### 16: Handling Multiple Return Values
	function multipleReturns() internal returns(uint a, uint b, uint c) {
	  return (1, 2, 3);
	}
	
	function processMultipleReturns() external {
	  uint a;
	  uint b;
	  uint c;
	  // This is how you do multiple assignment:
	  (a, b, c) = multipleReturns();
	}
	
	// Or if we only cared about one of the values:
	function getLastReturnValue() external {
	  uint c;
	  // We can just leave the other fields blank:
	  (,,c) = multipleReturns();
	}


### 17: Own Modifier
	address public owner;
	
	/**
	 * @dev Throws if called by any account other than the owner.
	 */
	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}
	
	function transferOwnership(address newOwner) public onlyOwner {
		require(newOwner != address(0));
    	owner = newOwner;
	}

Function Modifiers: modifier `onlyOwner()`. Modifiers are kind of half-functions that are used to modify other functions, usually to check some requirements prior to execution. In this case, onlyOwner can be used to limit access so only the owner of the contract can run this function. We'll talk more about function modifiers in the next chapter, and what that weird `_;` does.

### 18: Time units

- seconds,
- minutes
- hours
- days
- weeks
- years
- now

The variable `now` will return the current unix timestamp (the number of seconds that have passed since January 1st 1970). The unix time as I write this is 1515527488.

__Note:__ Unix time is traditionally stored in a 32-bit number. This will lead to the "Year 2038" problem, when 32-bit unix timestamps will overflow and break a lot of legacy systems. So if we wanted our DApp to keep running 20 years from now, we could use a 64-bit number instead — but our users would have to spend more gas to use our DApp in the meantime. Design decisions!

### 19: Passing structs as arguments
	function _doStuff(SomeStruct storage _struct) internal {}

---

### Save Gas

__Gas:__ In Solidity, __your users have to pay every time they execute a function on your DApp using a currency called gas.__ Users buy gas with Ether (the currency on Ethereum), so your users have to spend ETH in order to execute functions on your DApp.

Because running functions costs real money for your users, __code optimization is much more important in Ethereum than in other programming languages.__ If your code is sloppy, your users are going to have to pay a premium to execute your functions — and this could add up to millions of dollars in unnecessary fees across thousands of users.

---
`view` functions don't cost any gas when they're called externally by a user!

This is because `view` functions don't actually change anything on the blockchain – they only read the data. So marking a function with view tells web3.js that it only needs to query your local Ethereum node to run the function, and it doesn't actually have to create a transaction on the blockchain (which would need to be run on every single node, and cost gas).

__Note:__ If a `view` function is called internally from another function in the same contract that is not a view function, it will still cost gas. This is because the other function creates a transaction on Ethereum, and will still need to be verified from every node. So view functions are only free when they're called externally!

---

One of the more expensive operations in Solidity is using `storage` — particularly writes.

This is because every time you write or change a piece of data, it’s written permanently to the blockchain. Forever! Thousands of nodes across the world need to store that data on their hard drives, and this amount of data keeps growing over time as the blockchain grows. So there's a cost to doing that.

In order to keep costs down, you want to avoid writing data to storage except when absolutely necessary. Sometimes this involves seemingly inefficient programming logic — like rebuilding an array in memory every time a function is called instead of simply saving that array in a variable for quick lookups.

In most programming languages, looping over large data sets is expensive. But in Solidity, this is way cheaper than using storage if it's in an external view function, since view functions don't cost your users any gas. (And gas costs your users real money!).

---

Normally there's no benefit to using these sub-types because Solidity reserves 256 bits of storage regardless of the uint size. For example, using uint8 instead of uint (uint256) won't save you any gas.

But there's an exception to this: inside structs.

If you have __multiple uints inside a struct, using a smaller-sized uint when possible will allow Solidity to pack these variables together to take up less storage.__

You'll also want to cluster identical data types together (i.e. put them next to each other in the struct) so that Solidity can minimize the required storage space. For example, a struct with fields __uint c; uint32 a; uint32 b;__ will cost less gas than a struct with fields __uint32 a; uint c; uint32 b;__ because the uint32 fields are clustered together.

### Security

__Note:__ Giving the owner special powers over the contract like this is often necessary, but it could also be used maliciously. For example, the owner could add a backdoor function!

So it's important to remember that just because a DApp is on Ethereum does not automatically mean it's decentralized — you have to actually read the full source code to make sure it's free of special controls by the owner that you need to potentially worry about. There's a careful balance as a developer between maintaining control over a DApp such that you can fix potential bugs, and building an owner-less platform that your users can trust to secure their data.

An important security practice is to examine all your public and external functions, and try to think of ways users might abuse them. Remember — unless these functions have a modifier like onlyOwner, any user can call them and pass them any data they want to.

TODO: random, hash


### More

Note: `memory` arrays must be created with a length argument. They currently cannot be resized like storage arrays can with `array.push()`.


You can declare an array as `public`, and Solidity will automatically create a `getter` method for it. Other contracts would then be able to read (but not write) to this array. So this is a useful pattern for storing public data in your contract.

-libraries
- use for
- assambly

### Libraries

Using a base contract instead of a library to split the common code won’t save gas because in Solidity, inheritance works by copying code.

Libraries also execute in the scope of the calling smart contract and has access to the existing mapping and state variable of the smart contract calling it.

`this` revers to the address.