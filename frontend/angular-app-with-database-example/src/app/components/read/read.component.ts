import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit{
  constructor(private apiService: ApiserviceService){}

  readData: any;
  successMsg: any;

  ngOnInit(): void {
    this.apiService.getAllData().subscribe((res) => {
      this.readData = res.data;
    });
  }

  deleteID(id: any){
    this.apiService.deleteData(id).subscribe((res) =>{
      this.successMsg = res.message;
      this.apiService.getAllData().subscribe((res) => {
        this.readData = res.data;
      });
    });
  }
  toEmptySuccessMsg(){
    this.successMsg = '';
  }
}
