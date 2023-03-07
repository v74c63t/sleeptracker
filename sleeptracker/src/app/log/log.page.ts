
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
  data:SleepData = new SleepData; 
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
    var state = JSON.parse(localStorage.getItem('started')||"null");
    if(state != null) {
      this.started = state;
    }
  }

  //toggles sleepiness log
  sleepinessClick(){
    this.logSleepiness = !this.logSleepiness;
    this.resetSleepiness();
    this.showConfirmation(false);
    this.logOvernightSleep = false;
  }

  //resets sleepiness values
  sleepinessCancel(){
    this.resetSleepiness();
    this.showConfirmation(false);
  }
  //resets sleepiness values
  resetSleepiness(){
    this.sleepinessRangeVal = 1;
    this.resetCalDate();
  }

  //resets calendar date to actual date time
  resetCalDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.sleepinessDate = this.resetDate;
  }

  //resets overnight log values
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

  //reset start time to actual date time
  resetCalStartDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.overnightStart = this.resetDate;
  }

  //reset end time to start date time
  resetCalEndDate(){
    this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.overnightEnd = this.resetDate;
  }

  //toggles overnight log
  overnightClick() {
    this.logOvernightSleep = !this.logOvernightSleep;
    this.logSleepiness = false;
  }

  //creates sleepiness date with inputted range value and inputted date
  createSleepinessData() {
    this.data = new StanfordSleepinessData(this.sleepinessRangeVal, new Date(this.sleepinessDate)); 
  }

  // resets data
  deleteData() {
    this.data = new SleepData;
  }

  //toggles log full (allows user to input start time)
  logFull(state:boolean){
    this.fullStart = state;
  }

  //allows user to input end time
  logFullEnd(state:boolean) {
    this.fullEnd = state;
  }

  // toggles start log part
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
  }

  //creates overnight data
  createOvernightData(start:string, end:string) {
    this.data = new OvernightSleepData(new Date(start), new Date(end));
  }

  // convert local storage data to its respective sleep data
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

  //add data to list (first check if there is already data in local storage before adding)
  addData() {
    if(this.sleepData.length == 0) {
      var storage = JSON.parse(localStorage.getItem('SleepData')||"null");
      if(storage != null) {
        this.convert(storage);
      }
    }
    this.sleepData.push(this.data);
    localStorage.setItem('SleepData', JSON.stringify(this.sleepData))
  }
  // parse out start time from dateTimeString()
  startDateTimeString() {
    return this.data.dateTimeString().substring(0,this.data.dateTimeString().search("\n"))
  }

  //parse out end time from dateTimeString()
  endDateTimeString() {
    return this.data.dateTimeString().substring(this.data.dateTimeString().search("\n")+1,);
  }

  //toggles confirmation buttons
  showConfirmation(state:boolean) {
    this.confirmation = state;
  }

  // toggles start log timer
  // sets started/startDate to local storage so user can go to other tabs without timer resetting
  // if the state is false, the log is saved already so started and startDate can be reset and removed from local storage
  start(state:boolean) {
    localStorage.setItem('startDate', JSON.stringify(this.startLogTime));
    this.started = state;
    localStorage.setItem('started', JSON.stringify(this.started));
    if(state == false) {
      this.resetDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
      this.startLogTime = this.resetDate;
      this.endLogTime =this.resetDate;
      localStorage.removeItem('startDate');
      localStorage.removeItem('started');
    }
  }

  // get the end time from current time for start log
  end() {
    this.endLogTime = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    this.createOvernightData(this.startLogTime, this.endLogTime);
  }

  //toggles end date to display to user to confirm the end time
  showEndDate() {
    this.endDate = !this.endDate;
  }

  // toggles what buttons are shown for start log
  isDone() {
    this.done = !this.done;
  }
}
