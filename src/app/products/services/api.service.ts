import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseurl='https://ecart-backend.vercel.app'
subtotal=0
search=""
showSuccess:boolean=false
cartnumber=new BehaviorSubject(0)
  constructor(private http:HttpClient) {
    this.cartcount()
   }

  getallproducts(){
    return this.http.get(`${this.baseurl}/products/getallproducts`)
  }
  viewproduct(id:number){
  return this.http.get(`${this.baseurl}/products/view/${id}`)

  }
  addwish(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
   return this.http.post(`${this.baseurl}/wishlist/add`,body)
  }
  getwish(){
  return  this.http.get(`${this.baseurl}/wishlist`)
  }
  removewish(id:any){
   return this.http.delete(`${this.baseurl}/wishlist/remove/${id}`)
  }
  addtocart(product:any){
  let  body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:1

    }
   return this.http.post(`${this.baseurl}/products/cart`,body)

  }
  getcart(){
   return this.http.get(`${this.baseurl}/cart`)
  }
  cartcount(){
    this.getcart().subscribe({
      next:(res:any)=>{
  this.cartnumber.next(res.length)
      }
    })
  }
  deleteitem(id:any){
 return this.http.delete(`${this.baseurl}/cart/delete/${id}`)
  }
  
  increment(id:any){
   return this.http.get(`${this.baseurl}/cart/increment/${id}`)

  }
  decrement(id:any){
    return this.http.get(`${this.baseurl}/cart/decrement/${id}`)
 
   }
   empty(){
    return this.http.delete(`${this.baseurl}/cart/empty`)
   }
   gettotal(){

   }
   payamount(){
   return this.http.get(`${this.baseurl}/cart`)
   }
}
