import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, TextInput } from 'ionic-angular';
import { ZomatoProvider } from '../../providers/zomato/zomato';
import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ModalSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-search',
  templateUrl: 'modal-search.html',
})
export class ModalSearchPage {
	@ViewChild('searchInput') searchInput:TextInput ;
	query:string;
	restaurants:Array<any>;
  matches: string[];
  isRecording = false;

  detecQuery:Observable<any>;


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef,private zomatoProvider:ZomatoProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSearchPage');
    setTimeout(() => {
      this.searchInput.setFocus();
    },150);

  }
// recording
  // stopListening()
  // {
  //   this.speechRecognition.stopListening().then(()=>{
  //     this.isRecording = false;
  //   })
  // }




  doListening()
  {
    this.speechRecognition.hasPermission().then((hasPermission:boolean)=>{
      if(!hasPermission)
      {
        this.speechRecognition.requestPermission();
      }
      else{
        this.startListening();
      }
    })
  }

  startListening()
  {
    let options = {
      language:'id-ID'
    };
    this.speechRecognition.startListening(options).subscribe(matches=>{
      this.matches = matches;
      this.cd.detectChanges();
      this.searchInput.setFocus();
      this.searchInput.setValue(this.matches[0]);
    });
    this.isRecording = true;
    // setTimeout(()=>{
    //   this.trySearch();
    // },30000);
  }
  changeNow()
  {
    // this.query = "mie goreng";
    // document.getElementById("cari").focus();
    this.searchInput.setFocus();
    this.searchInput.setValue("mie goreng");
  }


//end speech
  dismiss() {
    this.viewCtrl.dismiss();
  }
  trySearch()
  {
  	//query search restaurant
    let req = {
      query : this.query,
      count: 10,
      cuisine:"",
      radius: 1000,
      sort:"real_distance",
      order:"asc"
    };
    // get restaurant with time out
    setTimeout(() => {
      this.zomatoProvider.getRestaurant(req).subscribe(
        data=>{
          this.restaurants = data.restaurants;
          
        });
    }, 1800);
  }
  levelLike(level)
  {
    if(level < 2.8)
    {
      return "sad";
    }
    else{
      return "happy";
    }
  }
  
  goToDetail(restId)
  {
    this.navCtrl.push(RestaurantProfilePage,{restId : restId});
  }
}
