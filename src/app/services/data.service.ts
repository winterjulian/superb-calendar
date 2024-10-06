import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadData() {
    fetch("http://localhost:3000/posts", {
      method: "GET"
    }).then(response => {
      console.log('response', response)
      return response.json();
    }).then(data => {
      console.log(data);
    })
  }

  saveData(input: Record<'title' | 'views', string | number>) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      console.log(response)
      return response.json();
    }).then(data => {
      console.log(data)
    })
  }
}
