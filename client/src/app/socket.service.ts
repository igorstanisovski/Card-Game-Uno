import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from './classes/user';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: any;

  constructor() {
  }

  connectToServer(user:User) {
    this.socket = io.connect('http://192.168.0.7:3000',{ query: `userID=${user._id}`});
    this.emit("hello","hello server");
    this.listen("hello").subscribe((data) => {
      console.log(data);
    })
    
  }

  disconnectFromServer(){
    this.socket.disconnect();
  }

  listen(event: string){
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(event: string, data: any) {
    this.socket.emit(event,data);
  }

  startGame(event: string, data: any) {
    this.emit(event,data);
    // this.listen('gameStarted').subscribe((response)=>{
    //   console.log(response);
    // })
  }
}
