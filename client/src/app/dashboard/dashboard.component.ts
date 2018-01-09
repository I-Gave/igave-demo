import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../window';

const Web3 = require('web3');
const contract = require('truffle-contract');
const IGVCore = require('../../../../build/contracts/IGVCore.json');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  upcomingCampaigns = [];
  newestCampaigns = [];
  totalCampaigns = 0;
  totalSupply = 0;
  totalRaised = 0;
  window;

  constructor(private winRef: WindowRef) {
    this.window = winRef.nativeWindow;
    const igv = contract(IGVCore);

    igv.setProvider(this.window.web3.currentProvider);

    this.init(igv);
  }

  async init(igv) {
    let instance = await igv.deployed();
    let totalCampaigns = await instance.totalCampaigns.call();
    let totalSupply = await instance.totalSupply.call();
    const totalRaised = await instance.totalRaised();

    this.totalSupply = totalSupply.toNumber();
    this.totalRaised = totalRaised.toNumber();
    this.totalCampaigns = totalCampaigns.toNumber();
  }

  ngOnInit() {

  }

}
