import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  title = 'game-room';

  ngOnInit(): void {
    this.http.get('http://localhost:3000').subscribe(res => {
      console.log(res)
    })
  }
}
