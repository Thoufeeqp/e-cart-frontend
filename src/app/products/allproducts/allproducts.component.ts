import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
   allproducts:any=[]
   search:any=""
  constructor(private api:ApiService){
    

  }
  ngOnInit(): void {
    this.api.getallproducts().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allproducts=res
        

        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    this.api.search=this.search
  }
  addtocart(product:any){
    this.api.addtocart(product).subscribe({
      next:(res:any)=>{
        alert(res)
        console.log(res);
        
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })

    }
    searching(event:any){
      const {value}=event.target
      this.search=value
      
  
    }
  }


