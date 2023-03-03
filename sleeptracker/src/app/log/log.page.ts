import { Component, OnInit, Output } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import {Injectable} from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
@Injectable({
  providedIn: 'root'
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
  
  constructor() { }

  ngOnInit() {
  }
  sleepinessClick(){
    this.logSleepiness = !this.logSleepiness;
    this.resetSleepiness();
    this.showConfirmation(false);
  }
  sleepinessCancel(){
    this.logSleepiness = false;
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
  }
  createSleepinessData() {
    this.data = new StanfordSleepinessData(this.sleepinessRangeVal, new Date(this.sleepinessDate)); 
  }
  deleteData() {
    this.data = new SleepData;
  }
  // sleepiness() {
  //   // this.data = new StanfordSleepinessData(this.sleepinessRangeVal); 
  //   this.sleepData.push(this.data);
  //   console.log(this.data.summaryString());
  //   console.log(this.sleepData.length);
  //   console.log(this.sleepinessDate);
  // }
  logFull(state:boolean){
    this.fullStart = state;
  }
  logFullEnd(state:boolean) {
    this.fullEnd = state;
  }
  startLog() {
    this.overnightLog = !this.overnightLog;
  }
  createOvernightData() {
    console.log(this.overnightStart);
    console.log(this.overnightEnd);
    this.data = new OvernightSleepData(new Date(this.overnightStart), new Date(this.overnightEnd));
  }
  addData() {
    this.sleepData.push(this.data);
    console.log(this.data.summaryString());
    console.log(this.sleepData.length);
    // console.log(this.sleepinessDate);
  }
  startDateTimeString() {
    return this.data.dateTimeString().substring(0,this.data.dateTimeString().search("\n"))
  }
  endDateTimeString() {
    return this.data.dateTimeString().substring(this.data.dateTimeString().search("\n")+1,);
  }
  printDate() {
    console.log(this.overnightStart);
    console.log(this.overnightEnd);
    console.log(this.fullStart);
    console.log(this.fullEnd);
  }
  showConfirmation(state:boolean) {
    this.confirmation = state;
  }
  getSleepData(){
    return this.sleepData;
  }
}
