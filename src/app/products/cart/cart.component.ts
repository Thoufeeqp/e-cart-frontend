import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 showSuccess:boolean=false
  cartitems:any=[]
  subtotal:number=0
  paymentsuccess:boolean=false
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getcart().subscribe({
      next:(res:any)=>{
        this.cartitems=res
        this.showSuccess=this.api.showSuccess
        if(this.showSuccess){
          this.empty()
          this.paymentsuccess=true
         setTimeout(() => {
          this.paymentsuccess=false
         }, 5000);
          
        }
        this.getcarttotal()
        
        

      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
    
  }
  getcarttotal(){

    let total=0
    this.cartitems.forEach((item:any)=>{
      total+=item.total
    
      this.subtotal=  Math.ceil(total)
      this.api.subtotal=this.subtotal
    })

  }
  deleteitem(id:any){
    this.api.deleteitem(id).subscribe({
      next:(res:any)=>{
        this.cartitems=res
        this.getcarttotal()
        this.api.cartcount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  increment(id:any){
    this.api.increment(id).subscribe({
      next:(res:any)=>{
        this.cartitems=res
        this.getcarttotal()
      }
    })

  }
  decrement(id:any){
    this.api.decrement(id).subscribe({
      next:(res:any)=>{
        this.cartitems=res
        this.getcarttotal()
      }
    })

  }
  empty(){
    this.api.empty().subscribe({
      next:(res:any)=>{
        this.cartitems=res
        this.subtotal=0
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  
}


