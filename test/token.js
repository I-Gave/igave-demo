// Specifically request an abstraction for MetaCoin
const IGVToken = artifacts.require('IGVToken');

contract('IGVToken', (accounts) => {
  it('Name: I Gave Token ', async () => {
    const instance = await IGVToken.deployed();
    const name = await instance.name();

    assert.equal(name, 'I Gave Token');
  });
  it('Symbol: TGV ', async () => {
    const instance = await IGVToken.deployed();
    const symbol = await instance.symbol();

    assert.equal(symbol, 'IGV');
  });
  it('Version: 1.0 ', async () => {
    const instance = await IGVToken.deployed();
    const version = await instance.version();

    assert.equal(version, '1.0');
  });
  it('Total Tokens capped at 1e+27 ', async () => {
    const instance = await IGVToken.deployed();
    const totalTokens = await instance.tokenCreationCap();

    assert.equal(totalTokens.toNumber(), 1e27);
  });
  it('Min Tokens capped at 2,500,000', async () => {
    const instance = await IGVToken.deployed();
    const minTokens = await instance.tokenCreationMin();

    assert.equal(minTokens.toNumber(), 2.5e24);
  });
  it('Has 18 Decimal Places', async () => {
    const instance = await IGVToken.deployed();
    const decimals = await instance.decimals();

    assert.equal(decimals.toNumber(), 18);
  });
  it('Eth Receiver equals Dev Receiver', async () => {
    const instance = await IGVToken.deployed();
    const ethReceiver = await instance.ethReceiver();
    const devReceiver = await instance.devReceiver();

    assert.equal(devReceiver, ethReceiver);
  });
  it('Eth Receiver equals Account[0]', async () => {
    const instance = await IGVToken.deployed();
    const ethReceiver = await instance.ethReceiver();

    assert.equal(accounts[0], ethReceiver);
  });
  it('Fund Over = false', async () => {
    const instance = await IGVToken.deployed();
    const fundOver = await instance.fundOver();

    assert.equal(fundOver, false);
  });
  it('Fund Start is before Fund End', async () => {
    const instance = await IGVToken.deployed();
    const start = await instance.fundingStartBlock();
    const end = await instance.fundingEndBlock();

    assert.isBelow(start.toNumber(), end.toNumber());
  });
  it('Token Exchange rate is 10000', async () => {
    const instance = await IGVToken.deployed();
    const rate = await instance.tokenExchangeRate();

    assert.equal(rate, 10000);
  });
  it('Dev Token Exchange rate is 2500', async () => {
    const instance = await IGVToken.deployed();
    const rate = await instance.devExchangeRate();

    assert.equal(rate, 2500);
  });
  it('Creates 10,000 Tokens', async () => {
    const instance = await IGVToken.deployed();
    await instance.createTokens({from: accounts[1], value: 1 });
    balance = await instance.balanceOf(accounts[1]);

    assert.equal(balance.toNumber(), 10000);
  });
  it('Transfers 5,000 Tokens', async () => {
    const instance = await IGVToken.deployed();
    await instance.transfer(accounts[2], 5000,  {from: accounts[1]});
    const balance1 = await instance.balanceOf(accounts[1]);
    const balance2 = await instance.balanceOf(accounts[2]);

    assert.equal(balance1.toNumber(), 5000);
    assert.equal(balance2.toNumber(), 5000);
  });
});

