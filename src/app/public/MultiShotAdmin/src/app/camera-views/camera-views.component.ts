import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-camera-views',
  templateUrl: './camera-views.component.html',
  styleUrls: ['./camera-views.component.css']
})
export class CameraViewsComponent implements OnInit {

  constructor(public socketService: SocketService) { }

  ngOnInit() {
  }

}
