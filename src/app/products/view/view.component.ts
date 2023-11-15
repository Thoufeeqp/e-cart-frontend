import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  product:any={}
  
  constructor(private api:ApiService,private view:ActivatedRoute){

    
  }
  ngOnInit(): void {
    this.view.params.subscribe({
      next:(res:any)=>{
        console.log(res);
        const {id}=res
       
        try{
            this.api.viewproduct(id).subscribe({
              next:(res:any)=>{
                console.log(res);
                this.product=res
                
              },
              error:(err:any)=>{
                console.log(err);
                
              }
            })
        }
        catch(error){
          console.log(error);
          
        }
        
      }
      ,error:(err:any)=>{
        console.log(err);
        
      }
    })
   
  }
  addwish(){
   
  this.api.addwish(this.product).subscribe({
    next:(res:any)=>{
      console.log(res);
      alert("product added successfully")
      
    },
    error:(err:any)=>{
      console.log(err.error);
      alert(err.error)
      
    }
  })
    
  }

 
 

}
