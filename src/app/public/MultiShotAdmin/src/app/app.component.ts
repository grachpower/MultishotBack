import {Component, OnInit} from '@angular/core';
import { MainApiService } from "./services/main-api/main-api.service";
import 'rxjs';
import {SocketService} from "./services/socket/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public url: string;

  constructor(
    private mainApiService: MainApiService,
    private socketService: SocketService,
  ) { }

  public ngOnInit() {
    this.mainApiService.fetchMachineUrl()
      .subscribe((data: any) => {
        this.url = data.url;

        this.socketService.connect(this.url);
      });
  }
}
