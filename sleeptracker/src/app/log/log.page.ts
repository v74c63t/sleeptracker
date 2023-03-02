import { Component, OnInit, Output } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  logSleepiness:boolean = false;
  logOvernightSleep:boolean = false;
  ScaleValues = StanfordSleepinessData.ScaleValues;
  sleepinessRangeVal:number=1;
  data:SleepData = new SleepData; // testing purposes will remove later
  resetDate:string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  // convert to PST
  sleepinessDate:string = this.resetDate;
  addedDate:boolean = false;
  sleepData:SleepData[] = [];
  overnightStart:string = this.resetDate;
  overnightEnd:string = this.resetDate;
  fullStart:boolean = false;
  fullEnd:boolean = false;
  overnightLog:boolean = false;
  
  constructor() { }

  ngOnInit() {
  }
  sleepinessClick(){
    this.logSleepiness = !this.logSleepiness;
    this.reset();
  }
  sleepinessCancel(){
    this.logSleepiness = false;
    this.reset();
  }
  reset(){
    this.sleepinessRangeVal = 1;
    this.resetCalDate();
  }
  resetCalDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.sleepinessDate = this.resetDate;
    this.overnightStart = this.resetDate;
    this.overnightEnd = this.resetDate;
  }
  overnightClick() {
    this.logOvernightSleep = !this.logOvernightSleep;
  }
  createSleepinessData() {
    this.data = new StanfordSleepinessData(this.sleepinessRangeVal, new Date(this.sleepinessDate)); 
  }
  deleteSleepinessData() {
    this.data = new SleepData;
  }
  sleepiness() {
    // this.data = new StanfordSleepinessData(this.sleepinessRangeVal); 
    this.sleepData.push(this.data);
    console.log(this.data.summaryString());
    console.log(this.sleepData.length);
    console.log(this.sleepinessDate);
  }
  logFull(){
    this.fullStart = !this.fullStart;
  }
  logFullEnd() {
    this.fullEnd = !this.fullEnd;
  }
  startLog() {
    this.overnightLog = !this.overnightLog;
  }
  getSleepData(){
    return this.sleepData;
  }
}
