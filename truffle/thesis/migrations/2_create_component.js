const Component = artifacts.require ('./Component.sol');

module.exports = deployer => {
    deployer.deploy (Component, 'Comp', '{}', 'Description');
};