import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadData() {
    fetch("http://localhost:3000/posts").then(response => {
      console.log('response', response)
      return response.json();
    }).then(data => {
      console.log(data);
    })
  }
}
