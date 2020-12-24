const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  before(async () => {
    contract = await Color.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Color')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'COLOR')
    })



  })

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mint('#EC058E')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1);
      // console.log(result);
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')
      console.log(accounts[0]);
      console.log(accounts[1]);

      //   // FAILURE: cannot mint same color twice
      await contract.mint('#EC058E').should.be.rejected;
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      // Mint 3 more tokens
      var id;
      id = await contract.mint('#5386E4')
      id = await contract.mint('#FFFFFF')
      id = await contract.mint('#000000')
      const totalSupply = await contract.totalSupply()

      let color
      let result = []

      for (var i = 1; i <= totalSupply; i++) {
        color = await contract.colors(i - 1)
        result.push(color)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
      var i = await contract.colors(0);
      console.log(i)
      i = await contract.colors(1);
      console.log(i)
      i = await contract.colors(2);
      console.log(i)
      i = await contract.colors(3);
      console.log(i)
      // var i = await contract.colors(4);
      // console.log(i)

      var j = await contract.ownerOf(1);
      console.log(j);
      var j = await contract.ownerOf(2);
      console.log(j);
      var j = await contract.ownerOf(3);
      console.log(j);
      // var j = await contract.getOwnedTokens(accounts[0]);
      var j = await contract.tokensOfOwner(accounts[0]);
      console.log(j);

      var j = await contract.tokensOfOwner(accounts[1]);
      console.log(j);


      // var j = await contract.ownerOf(2);
      // console.log(j);
    })
  })

  // describe('owner', async () => {
  //   it('lists colors', async () => {
  //     // Mint 3 more tokens
  //     await contract.mint('#5386E4')
  //     await contract.mint('#FFFFFF')
  //     await contract.mint('#000000')
  //     const totalSupply = await contract.totalSupply()

  //     let color
  //     let result = []

  //     for (var i = 1; i <= totalSupply; i++) {
  //       color = await contract.colors(i - 1)
  //       result.push(color)
  //     }

  //     console.log(contract)

  //     let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
  //     assert.equal(result.join(','), expected.join(','))
  //   })
  // })



})