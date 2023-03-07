
import { Component, OnInit } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  sleepData:SleepData[] = [];
  delete:boolean = false;

  constructor(private alertController: AlertController){}

  ngOnInit() {
    // get the sleep data from local storage and convert it to its respective data
    var data = JSON.parse(localStorage.getItem('SleepData')||"null");
    if(data != null) {
      this.convert(data);
    }
  }
  // converts sleep data to either Standford/Overnight data
  convert(data:any[]) {
    for(var i=0; i< data.length; i++) {
      if(data[i].type === "Stanford") {
        console.log("in");
        this.sleepData.push(new StanfordSleepinessData(data[i].loggedValue, new Date(data[i].loggedAt)));
      }
      else if(data[i].type === "Overnight") {
        console.log("in");
        this.sleepData.push(new OvernightSleepData(new Date(data[i].sleepStart), new Date(data[i].sleepEnd)));
      }
    }
  }

  // clears the local storage/all the logs
  clear() {
    localStorage.clear();
    this.sleepData = [];
  }

  // get data id
  getDataIndex(data:SleepData) {
    for(var i = 0; i < this.sleepData.length; i++) {
      if(data.id == this.sleepData[i].id) {
        return i;
      }
    }
    return -1;
  }

  // remove data from list
  remove(data:SleepData) {
    var i = this.getDataIndex(data);
    if(i != -1) {
      this.sleepData.splice(i, 1);
      localStorage.setItem("SleepData", JSON.stringify(this.sleepData));
    }
    this.delete = false;
  }

  //parse start time from dateTimeString()
  startDateTimeString(data:SleepData) {
    return data.dateTimeString().substring(0,data.dateTimeString().search("\n"))
  }

  //parse end time from dateTimeString()
  endDateTimeString(data:SleepData) {
    return data.dateTimeString().substring(data.dateTimeString().search("\n")+1,);
  }

  // toggles delete off for a button
  turnOffDel() {
    this.delete = false;
  }

  // sends alert to confirm that user wants to delete a log
  async confirmDelete(data:SleepData) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Logs cannot be recovered once deleted. If you are sure press delete again after closing the alert.',
      buttons: [
        {
          text: 'Close',
          role: 'delete'
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role == 'delete') {
      this.delete = true; 
    }
  }

  // sends alert to confirm that user wants to clear a log
  async confirmClear() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'All logs will be removed and logs cannot be recovered once deleted. If you are sure press clear, if not simply close the alert.',
      buttons: [
        {
          text: 'Clear',
          role: 'clear',
        },
        {
          text: 'Close',
          role: 'close'
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role == 'clear') {
      this.clear(); 
    }
  }
}