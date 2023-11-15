import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  public payPalConfig ? : IPayPalConfig;
  makepaymentclicked:boolean=false
  showpaypal:boolean=false


  checkoutclicked:boolean=false
  total=0
  username:any
  flatno:any
  state:any
  pin:any
  offerclicked:boolean=false
  coupenclicked:boolean=false
  discount=0
  cart:any=[]
  payable=0

  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){

  }
  addressform=this.fb.group({
    username:[''],
    flatno:[''],
    state:[''],
    pin:['']
  })
  checkout(){
    if(this.addressform.valid){
      this.checkoutclicked=true
      this.username=this.addressform.value.username
      this.flatno=this.addressform.value.flatno
      this.state=this.addressform.value.state
      this.pin=this.addressform.value.pin
        
      this.api.payamount().subscribe({
        next:(res:any)=>{
           this.cart=res
           let totals=0
           this.cart.forEach((item:any)=>{
            totals+=item.total

            this.total=Math.ceil(totals)
            
           })
           this.initConfig()
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    else{
      alert('invalid form')
    }
  }
  offer(){
    this.offerclicked=true
  }
 discount10(){
this.total-=Math.ceil(this.total*.1)
this.coupenclicked=true
 

 }
 discount50(){
  this.total-=Math.ceil(this.total*.5)
  this.coupenclicked=true
 }
 makepayment(){
  this.makepaymentclicked=true
 }
 private initConfig(): void {
  let amount=this.total.toString()
  
  this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: amount,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: amount
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'USD',
                      value: amount,
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
        
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;
          this.showpaypal=true
          this.makepaymentclicked=false
          this.api.showSuccess=this.showSuccess
          this.router.navigateByUrl('products/cart')
          
          

      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;
          this.showpaypal=true
          this.makepaymentclicked=false

      },
      onError: err => {
          console.log('OnError', err);
          this.showError = true;
          this.showpaypal=true
          this.makepaymentclicked=false
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          
      }
  }
}

}
