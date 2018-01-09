# I Gave Demo

This demo uses truffle and ganache to create a test Ethereum network, deploy the I Gave contracts and launch the demo. To get started:

```
$ cd client
$ npm install
$ ng serve
```

Angular CLI will build the front end client and serve it at localhost:4200

Create a local testnet:
```
$ truffle develop
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

truffle(develop)>
```

```
truffle(develop)>  migrate
Compiling ./contracts/ERC677.sol...
Compiling ./contracts/ERC677Receiver.sol...
Compiling ./contracts/ERC721.sol...
Compiling ./contracts/IGVAsset.sol...
Compiling ./contracts/IGVBase.sol...
Compiling ./contracts/IGVCampaign.sol...
Compiling ./contracts/IGVCore.sol...
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/SafeMath.sol...
Compiling ./contracts/StandardToken.sol...
Compiling ./contracts/Token.sol...
Writing artifacts to ./build/contracts

Using network 'develop'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x77b140201db413a3433255cda984eef4955f7da88e0f82587ddcd27e792452c9
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 3_core_migration.js
  Deploying IGVCore...
  ... 0xc47873d10958e7e71c6ba92e163a9ea46b3333c6ad649ba206866e8384886089
  IGVCore: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0x6c490dbda19da7864052e45cd99efda3f7e0c7dc2e4b8f96722bf21f052b3f07
Saving artifacts...
truffle(develop)>

```

Now a local network has been setup, the contracts are deployed and visiting the browser at localhost:4200

Install Metamask: https://metamask.io/

Connect Metamask to the local Ethereum network

Send yourself some test Ether
```
truffle(develop)> web3.eth.sendTransaction({ to: "Your Metamask Address Goes Here", from: web3.eth.accounts[0], value: 1000000000000000000 })
'0x569cde4ef461a75393c0e7e2e7e82d9773310a32d82eba35187316a53f6484d5'
```

