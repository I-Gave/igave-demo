pragma solidity 0.4.18;

contract IGVCampaign  {
    Campaign[] campaigns;
    mapping (uint256 => address) public campaignIndexToOwner;
    mapping (address => uint256[]) public campaignOwnerToIndexes;
    mapping (address => uint256) public campaignOwnerTotalCampaigns;
    mapping (uint256 => uint256) public campaignEscrowBalance;
    mapping (uint256 => uint256) public campaignBalance;
    mapping (uint256 => Token[]) public campaignTokens;
    mapping (uint256 => uint64) public campaignTokenCount;
    mapping (uint256 => uint64[]) public campaignTokensIssued;

    event CreateCampaign(address indexed owner, uint256 campaignId);
    event CreateToken(uint256 indexed campaignId, string name);

    struct Campaign {
        uint256 startBlock;
        uint256 endBlock;
        address owner;
        string campaignName;
        bool veto;
    }

    struct Token {
      uint256 campaignId;
      uint64 supply;
      uint64 remaining;
      string name;
      uint256 price;
    }

    function _createCampaign(
        uint256 _startBlock,
        uint256 _endBlock,
        uint256 _escrowAmount,
        address _owner,
        string _campaignName
    )
        internal
        returns (uint)
    {
      Campaign memory _campaign = Campaign({
        startBlock: _startBlock,
        endBlock: _endBlock,
        owner: _owner,
        campaignName: _campaignName,
        veto: false
      });

      uint256 newCampaignId = campaigns.push(_campaign) - 1;

      campaignIndexToOwner[newCampaignId] = _owner;
      campaignEscrowBalance[newCampaignId] += _escrowAmount;
      campaignOwnerToIndexes[_owner].push(newCampaignId);
      campaignOwnerTotalCampaigns[_owner] += 1;

      CreateCampaign(_owner, newCampaignId);

      return newCampaignId;
    }

    function _createToken(
      uint256 _campaignId,
      uint64 _supply,
      string _name,
      uint256 _price
    )
      internal
      returns (uint)
    {
      Token memory _token = Token({
        campaignId: _campaignId,
        supply: _supply,
        remaining: _supply,
        name: _name,
        price: _price
      });

      uint256 tokenIndex = campaignTokens[_campaignId].push(_token);
      campaignTokenCount[_campaignId]++;

      CreateToken(_campaignId, _name);

      return tokenIndex;
    }
    // -1 Genesis Campaign is not a valid campaign
    function totalCampaigns() public view returns (uint) {
      return campaigns.length - 1;
    }

    function campaignTokenCount(uint256 _campaignId) public view returns (uint64) {
      return campaignTokenCount[_campaignId];
    }
}