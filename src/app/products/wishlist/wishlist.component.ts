import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any=[]
  
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getwish().subscribe({
      next:(res:any)=>{
        
        this.wishlist=res

        
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
    
  }
  removewish(id:any){
    
   this.api.removewish(id).subscribe({
    next:(res:any)=>{
    
       this.wishlist=res

    }
    ,error:(err:any)=>{
      console.log(err);
      
    }
   })
    
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

}
