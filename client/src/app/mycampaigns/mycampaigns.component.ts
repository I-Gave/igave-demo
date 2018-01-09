import { Component } from '@angular/core';
import { WindowRef } from '../window';

const Web3 = require('web3');
const contract = require('truffle-contract');
const IGVCore = require('../../../../build/contracts/IGVCore.json');

@Component({
  selector: 'app-dashboard',
  templateUrl: './mycampaigns.component.html',
  styleUrls: ['./mycampaigns.component.css']
})

export class MyCampaignsComponent {

  campaigns = [];
  window;

  constructor(private winRef: WindowRef) {
    this.window = winRef.nativeWindow;
    const igv = contract(IGVCore);

    igv.setProvider(this.window.web3.currentProvider);

    this.init(igv);
  }

  async init(igv) {
    let instance = await igv.deployed();
    let totalCampaigns = await instance.getTotalCampaigns.call(this.window.web3.eth.accounts[0]);
    totalCampaigns = totalCampaigns.toNumber();

    for (let i = 0; i < totalCampaigns; i++) {
      let id = await instance.getCampaignIdByOwnerIndex.call(this.window.web3.eth.accounts[0], i);
      id = id.toNumber();
      let c = await instance.getCampaign.call(id);

      this.campaigns.push({
        id: id,
        startBlock: c[0],
        endBlock: c[1],
        address: c[2],
        name: c[3]
      });

    }
  }


}
