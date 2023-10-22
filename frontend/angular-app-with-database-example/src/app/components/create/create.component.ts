import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  constructor(private apiService: ApiserviceService, private router: ActivatedRoute){}
  
  now = new Date();
  errorMsg: any;
  successMsg: any;
  getparamid: any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.apiService.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res);
        if(res.message == 'data not found'){
          this.errorMsg = 'No existed item';
        } else{
          this.itemFrom.patchValue({
            name: res.data[0].name,
            description: res.data[0].description
         });
        }
      });
    }
  }


  itemFrom = new FormGroup({
    "name": new FormControl('', Validators.required),
    "description": new FormControl('', Validators.required),
    "dateCreation": new FormControl(''),
  });

  itemSubmit(){
    if(this.itemFrom.valid){
      this.apiService.createData(this.itemFrom.value).subscribe((res) => {
        console.log(res, 'res ==>');
        this.itemFrom.reset();
        this.successMsg = res.message;
      });
    } else{
      this.errorMsg = 'All fileds are required!';
    }
  }

  itemUpdate(){
    if(this.itemFrom.valid){
      this.apiService.updateData(this.getparamid, this.itemFrom.value).subscribe((res) => {
        this.successMsg = res.message;
      });
    } else{
      this.errorMsg = 'All fileds are required!';
    }
  }

  toEmptyErrorMsg(){
    this.errorMsg = '';
  }
  toEmptySuccessMsg(){
    this.successMsg = '';
  }
}
