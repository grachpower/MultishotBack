import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket/socket.service";

@Component({
  selector: 'app-camera-controls',
  templateUrl: './camera-controls.component.html',
  styleUrls: ['./camera-controls.component.css']
})
export class CameraControlsComponent implements OnInit {

  constructor(
    private socketService: SocketService,
  ) { }

  ngOnInit() {
  }

  public emitShot() {
    this.socketService.emitShot();
  }
}
