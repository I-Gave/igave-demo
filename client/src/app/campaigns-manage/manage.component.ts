import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowRef } from '../window';

const contract = require('truffle-contract');
const IGVCore = require('../../../../build/contracts/IGVCore.json');

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCampaignsComponent {
  id = '';
  igv;
  sub;
  window;
  campaign = {};
  tokens = [];
  newToken = {
    name: '',
    value: 0,
    supply: ''
  }

  constructor(private route: ActivatedRoute, private winRef: WindowRef) {
    this.window = winRef.nativeWindow;
    this.sub = route.params.subscribe(params => {
      this.id = params["id"];
    });

    const igv = contract(IGVCore);
    this.igv = igv;

    this.igv.setProvider(this.window.web3.currentProvider);
    this.init();

  }

  async init() {
    let instance = await this.igv.deployed();

    let c = await instance.getCampaign.call(this.id);

    this.campaign = {
      id: this.id,
      startBlock: c[0].toNumber(),
      endBlock: c[1].toNumber(),
      owner: c[2],
      name: c[3]
    }

    let t = await instance.campaignTokenCount(this.id);

    for (let i = 0; i < t; i++) {
      let t = await instance.getToken(this.id, i);
      console.log(t[3].toNumber())
      this.tokens.push({
        campaign: this.id,
        index: i,
        supply: t[1].toNumber(),
        name: t[2],
        value: t[3].toNumber() / 10e18
      })
    }
    console.log(this.tokens);
  }


  async createToken() {
    const id = this.id;
    const newToken = this.newToken;
    const account = this.window.web3.eth.accounts[0];
    const showNotification = this.showNotification;
    this.igv.deployed().then(function (instance) {
      const igv = instance;
      let value = newToken.value * 10e18;
      console.log(value);
      return igv.createToken(
        id,
        newToken.supply,
        newToken.name,
        value,
        { from: account }
      );
    }).then(function (result) {
      console.log(result);
      showNotification('bottom', 'right', 'success', `Succes: result.tx`);
    }).catch(function (e) {
      console.log(e);
      showNotification('bottom', 'right', 'danger', 'Tx failed');
    })
  }

  async buyToken(campaignId, tokenId, value) {
    const account = this.window.web3.eth.accounts[0];
    const showNotification = this.showNotification;

    this.igv.deployed().then(function (instance) {
      const igv = instance;

      return igv.createCertificate(
        campaignId,
        tokenId,
        { from: account,
          value: (value * 10e17)
        }
      );
    }).then(function (result) {
      console.log(result);
      showNotification('bottom', 'right', 'success', `Succes: result.tx`);
    }).catch(function (e) {
      console.log(e);

      showNotification('bottom', 'right', 'danger', 'Tx failed');
    })
  }

  showNotification(from, align, color, msg) {
    $.notify({
      icon: "notifications",
      message: msg

    }, {
        type: color,
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      });
  }

}


