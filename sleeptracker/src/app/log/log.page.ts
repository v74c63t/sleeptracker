
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
  confirmation:boolean = false;
  startLogTime:string = this.resetDate;
  started:boolean = false;
  endLogTime:string = "";
  endDate:boolean = false;
  done:boolean = false;
  
  constructor() { }

  ngOnInit() {
    console.log(this.sleepData);
    var state = JSON.parse(localStorage.getItem('started')||"null");
    if(state != null) {
      this.started = state;
    }
  }
  sleepinessClick(){
    this.logSleepiness = !this.logSleepiness;
    this.resetSleepiness();
    this.showConfirmation(false);
    this.logOvernightSleep = false;
  }
  sleepinessCancel(){
    this.resetSleepiness();
    this.showConfirmation(false);
  }
  resetSleepiness(){
    this.sleepinessRangeVal = 1;
    this.resetCalDate();
  }
  resetCalDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.sleepinessDate = this.resetDate;
  }
  overnightCancel() {
    this.resetCalStartDate();
    this.resetCalEndDate();
    this.fullEnd = false;
    this.fullStart = false; 
    this.overnightLog = false;
    this.confirmation = false;
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.endLogTime = this.resetDate;
  }
  resetCalStartDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.overnightStart = this.resetDate;
  }
  resetCalEndDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.overnightEnd = this.resetDate;
  }
  overnightClick() {
    this.logOvernightSleep = !this.logOvernightSleep;
    this.logSleepiness = false;
  }
  createSleepinessData() {
    this.data = new StanfordSleepinessData(this.sleepinessRangeVal, new Date(this.sleepinessDate)); 
  }
  deleteData() {
    this.data = new SleepData;
  }
  logFull(state:boolean){
    this.fullStart = state;
    if(state==true) {
      this.overnightEnd = this.overnightStart;
    }
  }
  logFullEnd(state:boolean) {
    this.fullEnd = state;
  }
  startLog(state:boolean) {
    this.overnightLog = state;
    this.endDate = false;
    this.done = false;
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    var s = JSON.parse(localStorage.getItem('startDate')||"null");
    if(s != null) {
      this.startLogTime = s;
    }
    else {
      this.startLogTime = this.resetDate;
    }
    localStorage.setItem('startDate', JSON.stringify(this.startLogTime));
  }
  createOvernightData(start:string, end:string) {
    console.log(start);
    console.log(end);
    this.data = new OvernightSleepData(new Date(start), new Date(end));
  }
  convert(storage:any[]) {
    for(var i=0; i< storage.length; i++) {
      if(storage[i].type === "Stanford") {
        this.sleepData.push(new StanfordSleepinessData(storage[i].loggedValue, new Date(storage[i].loggedAt)));
      }
      else if(storage[i].type === "Overnight") {
        this.sleepData.push(new OvernightSleepData(new Date(storage[i].sleepStart), new Date(storage[i].sleepEnd)));
      }
    }
  }
  addData() {
    if(this.sleepData.length == 0) {
      var storage = JSON.parse(localStorage.getItem('SleepData')||"null");
      if(storage != null) {
        this.convert(storage);
      }
    }
    this.sleepData.push(this.data);
    console.log(this.data.summaryString());
    console.log(this.sleepData.length);
    localStorage.setItem('SleepData', JSON.stringify(this.sleepData))
    // console.log(this.sleepinessDate);
  }
  startDateTimeString() {
    return this.data.dateTimeString().substring(0,this.data.dateTimeString().search("\n"))
  }
  endDateTimeString() {
    return this.data.dateTimeString().substring(this.data.dateTimeString().search("\n")+1,);
  }
  showConfirmation(state:boolean) {
    this.confirmation = state;
  }
  start(state:boolean) {
    this.started = state;
    localStorage.setItem('started', JSON.stringify(this.started));
    if(state == false) {
      this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
      this.startLogTime = this.resetDate;
      this.endLogTime =this.resetDate;
      localStorage.removeItem('startDate');
    }
  }
  end() {
    this.endLogTime = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.createOvernightData(this.startLogTime, this.endLogTime);
  }
  showEndDate() {
    this.endDate = !this.endDate;
  }
  isDone() {
    this.done = !this.done;
  }
  getSleepData(){
    return this.sleepData;
  }
}
