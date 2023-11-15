import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts:any,searchKey:string,property:string): any[] {
    const result:any=[]
    if(!allproducts || searchKey=="" || property==""){
      return allproducts
    }
    allproducts.forEach((item:any)=>{
if(      item[property].includes(searchKey)
){
  result.push(item)
}    })
    return result;
  }

}
