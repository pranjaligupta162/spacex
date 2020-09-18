import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {makeStateKey, TransferState} from "@angular/platform-browser";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-filter-comp',
  templateUrl: './filter-comp.component.html',
  styleUrls: ['./filter-comp.component.css']
})
export class FilterCompComponent implements OnInit {
 fltrDta:any;
 launchYrArr=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient,private transferState: TransferState) { }
 launchYr='';
 landStatus='';
 launchStatus='';
 localQry='';
  ngOnInit(){
  	if (isPlatformBrowser(this.platformId)){
	  	this.localQry = localStorage.getItem('qry');
  	}
  	this.getFilterdata(null,null);
  }

  getFilterdata=(ele:any,e:any)=>{
  	let myTransferStateKey = makeStateKey<any>("myDatas");
  	if(ele!=null){
	  	if(ele=='year'){
	  		if(e.target.classList.value.indexOf('active')>-1){
	  			this.launchYr='';
	  			e.target.classList.remove('active');
	  		}
	  		else{
	  			this.launchYr=e.target.innerText;
	  			if(document.querySelector('.launchYrFltr .active')!=null)
	  				document.querySelector('.launchYrFltr .active').classList.remove('active');
	  			e.target.classList.add('active');
	  		}
	  	}else if(ele=='launch'){
	  		if(e.target.classList.value.indexOf('active')>-1){
	  			this.launchStatus='';
	  			e.target.classList.remove('active');
	  		}
	  		else{
	  			this.launchStatus=e.target.innerText;
	  			if(document.querySelector('.succsLaunchFltr .active')!=null)
	  				document.querySelector('.succsLaunchFltr .active').classList.remove('active');
	  			e.target.classList.add('active');
	  		}
	  	}else if(ele=='land'){
	  		if(e.target.classList.value.indexOf('active')>-1){
	  			this.landStatus='';
	  			e.target.classList.remove('active');
	  		}
	  		else{
	  			this.landStatus=e.target.innerText;
	  			if(document.querySelector('.succsLandFltr .active')!=null)
	  				document.querySelector('.succsLandFltr .active').classList.remove('active');
	  			e.target.classList.add('active');
	  		}
	  	}
	  	this.transferState.remove(myTransferStateKey);
  	}else{
  		this.launchYr=this.getQueryParamByName('launch_year',null);
	  	this.launchStatus=this.getQueryParamByName('launch_success',null);
	  	this.landStatus=this.getQueryParamByName('land_success',null);
  	}
 
  	let qry='';
  	if(this.launchYr!='' &&this.launchYr!=null )
  		qry=`${qry}&launch_year=${this.launchYr}`;
  	if(this.launchStatus!='' && this.launchStatus!=null)
  		qry=`${qry}&launch_success=${this.launchStatus}`;
  	if(this.landStatus!='' && this.landStatus!=null)
  		qry=`${qry}&land_success=${this.landStatus}`;

  	if (isPlatformBrowser(this.platformId) && this.localQry!='' && this.localQry!=null){
  		qry=this.localQry;
  		this.transferState.remove(myTransferStateKey);
  		let tmpArr = qry.split('&');
  		for(let a of tmpArr){
  			if(a.split('=')[0]=='launch_year')
  				this.launchYr=a.split('=')[1];
  			else if(a.split('=')[0]=='launch_success')
  				this.launchStatus=a.split('=')[1];
  			else if(a.split('=')[0]=='land_success')
  				this.landStatus=a.split('=')[1];
  		}
  	}
  	if(this.transferState.hasKey(myTransferStateKey)) {
          this.fltrDta = this.transferState.get(myTransferStateKey, {});
          this.transferState.remove(myTransferStateKey);
    } else {
	  	this.http.get(`https://api.spaceXdata.com/v3/launches?limit=100${qry}`).subscribe(response=>{
	  		this.fltrDta=response;
	  		this.transferState.set(myTransferStateKey, this.fltrDta);
	  		if (isPlatformBrowser(this.platformId)){
	  			localStorage.setItem('qry',qry);
	  			window.history.pushState({},document.title, `${document.URL.split('?limit')[0]}?limit=100${qry}`);
	  			this.localQry='';
	  		}
	  	});
	}
  }
  getQueryParamByName=(name, url)=>{
	  	if (isPlatformBrowser(this.platformId)){
	  		if (url==null) url = window.location.href;
		    name = name.replace(/[\[\]]/g, '\\$&');
		    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	  	}
	  	return null;
	}
}
