import { Component, OnInit } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { LogPage } from '../log/log.page'; 

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  data:SleepData[] = [];

  constructor(){}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('SleepData')||"null");
    //FIGURE OUT HOW TO GET THE DATA
    console.log(this.data);
  }

}
