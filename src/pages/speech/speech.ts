import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Generated class for the SpeechPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speech',
  templateUrl: 'speech.html',
})
export class SpeechPage {
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechPage');
  }

  stopListening()
  {
  	this.speechRecognition.stopListening().then(()=>{
  		this.isRecording = false;
  	})
  }

  getPermission()
  {
  	this.speechRecognition.hasPermission().then((hasPermission:boolean)=>{
  		if(!hasPermission)
  		{
  			this.speechRecognition.requestPermission();
  		}
  	})
  }

  startListening()
  {
  	let options = {
  		language:'id-ID'
  	};
  	this.speechRecognition.startListening().subscribe(matches=>{
  		this.matches = matches;
  		this.cd.detectChanges();
  	});
  	this.isRecording = true;
  }

}
