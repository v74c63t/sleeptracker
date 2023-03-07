--Readme document for Vanessa Tang, Jaime Park, vanesst5@uci.edu, jaimesp@uci.edu, 86856328, 40361959--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

18/20
- 3/3 The ability to log overnight sleep
- 3/3 The ability to log sleepiness during the day
- 3/3 The ability to view these two categories of logged data
- 3/3 Either using a native device resource or backing up logged data
- 2/3 Following good principles of mobile design
- 2/3 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
before wed: ~5 havent kept track
wed: 6-8?
th: 12?
fri: 16 hrs
sun: 2 hrs
mon: 3hrs

3. What online resources did you consult when completing this assignment? (list specific URLs)
https://ionicframework.com/docs/api/range
https://ionicframework.com/docs/api/grid
https://ionicframework.com/docs/api/button
https://ionicframework.com/docs/api/card
https://ionicframework.com/docs/api/input
https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
https://ionicframework.com/docs/api/alert
https://ionicframework.com/docs/api/modal
https://ionicframework.com/docs/api/list
https://ionicframework.com/docs/api/fab



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
We did not consult other classmates or individuals for this assignment.


5. Is there anything special we need to know in order to run your code?
There is nothing special that you need to know in order to run the code.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
No, we did not design our app with a particular type of user in mind. 


7. Did you design your app specifically for iOS or Android, or both?
The app is mostly designed for iOS.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
They can either input the overnight log all at once by supplying both the start and end times or start a log before sleeping 
and end the log after they wake up (we also made it so the user can start a log, leave the page and still have the timer running
so they can end the log at a later time by using local storage). We chose to support it this way so the users have a choice in how 
they would like to log the data, for example, some users may have trouble remember when they started sleeping so they would want 
the app to keep track of that information for them while others may just want to log everything in one sitting.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
They can use a slider to choose a value from the Stanford Sleepiness scale values and input a time for the log via ion-datetime.
This would make inputting the information simpler for the user because there would not be any issues with input formatting because 
the user input is essentially preformatted by the ionic components through binding which makes it easy to retrieve these inputs.  


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
They can view all the log in separate tab with both the sleepiness and overnight data in one list and they can click on a log
to view more detailed information about it or delete the log. We kept it this way to make everything simple so there is no need 
to go to different places to find each type of log and for the screen not to be cluttered.


11. Which feature choose--using a native device resource, backing up logged data, or both?
We chose to back up the logged data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
It backs up to local storage.

14. How does your app implement or follow principles of good mobile design?
There are a lot of confirmation prompts (alerts, modal cards, buttons) that users go through to ensure that they are satisfied with what 
they are inputting and ways for them to go back and make changes. There are ways to delete logs if a user is unsatisfied with what was logged
before.

