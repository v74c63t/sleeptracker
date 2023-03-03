import { nanoid } from 'nanoid';

export class SleepData {
	id:string;
	loggedAt:Date;
	type:string;

	constructor(type="Unknown") {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		this.id = nanoid();
		this.loggedAt = new Date();
		this.type = type;
	}

	summaryString():string {
		return 'Unknown sleep data';
	}

	dateString():string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	dateTimeString():string {
		return (this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + " " + 
		this.loggedAt.toLocaleTimeString('en-US'))
	}
}
