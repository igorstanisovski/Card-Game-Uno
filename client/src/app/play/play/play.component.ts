import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ViewContainerRef, Renderer2 } from '@angular/core';
import { User } from '../../classes/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable} from 'rxjs';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('cards') private d1: ElementRef;
  @ViewChild('gameCanvas') private gameCanvas: ElementRef;
  @ViewChild('deck') private deck: ElementRef;

  userIsConnected: boolean = false;
  user:User;
  cards: any = [];
  cardOnBoard:any;
  gameStarted:boolean;
  deleteAllCards:boolean = false;
  turn:boolean = false;
  dialogConfig:any;

  constructor(private userService:UserService,private route: ActivatedRoute,private router: Router, 
    private socketService: SocketService, private elementRef:ElementRef, private renderer: Renderer2) { 
  }

  getUsername() {
    if(this.user.username === 'igorcheta'){
      return true;
    }
    return false;
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  startGame() {
    this.socketService.startGame('startGame','');
  }
  
  connect(): void {
    this.userIsConnected = true;
    var user = this.getUser(); 
    this.socketService.connectToServer(user);
    this.ngOnInit();
  }

  disconnect(): void {
    this.userIsConnected = false;
    this.socketService.disconnectFromServer();
    this.cards = [];
    this.gameStarted = false;
  }

  userConnected() {
    if(this.userIsConnected){
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    if(this.userIsConnected){
      this.socketService.listen('gameStarted').subscribe((data) => {
        window.alert(data);
        this.gameStarted=true;
      });

      this.socketService.listen('cards').subscribe((data:any) => {
        this.cards = data.cards;
      });

      this.socketService.listen('cardOnBoard').subscribe((data:any) => {
        this.cardOnBoard = data;
        this.deleteAllCards = true;
        if(!this.turn){
          this.ngAfterViewInit();
        }
      })

      this.socketService.listen('card').subscribe((data:any) => {
        this.cards.push(data);
        this.deleteAllCards = true;
        this.ngAfterViewInit();
      })

      this.socketService.listen('turn').subscribe((data) => {
        this.deleteAllCards=true;
        this.turn = true;
        window.alert(data);
        this.ngAfterViewInit();
      })

    }
  }

  ngOnDestroy(): void{
    if(this.userIsConnected){
      this.disconnect();
    }
  }

  ngAfterViewInit(): void {
    //delete all user cards so that we can refresh the view
    if(this.deleteAllCards){
      this.deleteAllCards = false;
    //   const childElements = this.el.nativeElement.childNodes;
    // for (let child of childElements) {
    //   this.renderer.removeChild(this.el.nativeElement, child);
    // }
      const myEl = this.d1.nativeElement.childNodes;
      for(let child of myEl){
        this.renderer.removeChild(this.d1.nativeElement,child);
      }
      const myEle = this.deck.nativeElement.childNodes;
      for(let child of myEle){
        this.renderer.removeChild(this.deck.nativeElement,child);
      }
      const myElem = this.gameCanvas.nativeElement.childNodes;
      for(let child of myElem){
        this.renderer.removeChild(this.gameCanvas.nativeElement,child);
      }
    }
    if(this.userIsConnected && this.turn){
      //show cards for user with available clicks
      for(var i = 0;i < this.cards.length;i++){
        const div = this.renderer.createElement('div');
        var img = document.createElement('img');
        const cardvalue = this.cards[i].value;
        const cardcolor = this.cards[i].color;
        img.src = `../../../assets/cards/${cardcolor}/${cardcolor}_${cardvalue}.png`;
        img.height = 120;
        img.width = 80;
        this.renderer.addClass(div,'col-md-1');
        this.renderer.appendChild(div,img);
        this.renderer.listen(div, 'click' , () => {
          if(this.cardOnBoard.color === cardcolor || cardcolor === 'All' || this.cardOnBoard.value === cardvalue){
            window.alert("You play: " + cardcolor + " " + cardvalue);
            this.cardOnBoard = {value: cardvalue, color:cardcolor };
            this.socketService.emit('cardOnBoard',this.cardOnBoard);
            this.renderer.removeChild(this.d1.nativeElement,div);
            for(var j = 0;j<this.cards.length;j++){
              if(this.cards[j].color === cardcolor && this.cards[j].value === cardvalue){
                this.cards.splice(j,1);
              }
            }
            const childElements = this.gameCanvas.nativeElement.childNodes;
            for (let child of childElements) {
              this.renderer.removeChild(this.gameCanvas.nativeElement, child);
            }
            this.turn = false;
            this.socketService.emit('turnOver','');
          }
          else {
            window.alert("You can't play this card! Choose color " + this.cardOnBoard.color + "or value: " + this.cardOnBoard.value)
          }
        })
        this.renderer.appendChild(this.d1.nativeElement, div);
      }
      //show deck with click for pulling cards
      const deckDiv = this.renderer.createElement('div');
      const deckImg = document.createElement('img');
      deckImg.src = '../../../assets/uno_deck_back.png';
      deckImg.height = 120;
      deckImg.width = 80;
      this.renderer.appendChild(deckDiv,deckImg);
      this.renderer.listen(deckDiv, 'click', () => {
        this.socketService.emit('deck','');
        this.turn = false;
        this.socketService.emit('turnOver','');
      })
      this.renderer.appendChild(this.deck.nativeElement,deckDiv); 
      //show on board card - last played card
      const boardCardDiv = this.renderer.createElement('div');
      var img = document.createElement('img');
      var color = this.cardOnBoard.color;
      var value = this.cardOnBoard.value;
      img.src = `../../../assets/cards/${color}/${color}_${value}.png`;
      img.height = 120;
      img.width = 80;
      this.renderer.appendChild(boardCardDiv,img);
      this.renderer.appendChild(this.gameCanvas.nativeElement, boardCardDiv);
    }
    else if(this.userIsConnected && !this.turn){
      //show deck with disabled click
      const deckDiv = this.renderer.createElement('div');
      const deckImg = document.createElement('img');
      deckImg.src = '../../../assets/uno_deck_back.png';
      deckImg.height = 120;
      deckImg.width = 80;
      this.renderer.appendChild(deckDiv,deckImg);
      this.renderer.appendChild(this.deck.nativeElement,deckDiv);
      //show on board card - last played card
      const div = this.renderer.createElement('div');
      var img = document.createElement('img');
      var color = this.cardOnBoard.color;
      var value = this.cardOnBoard.value;
      img.src = `../../../assets/cards/${color}/${color}_${value}.png`;
      img.height = 120;
      img.width = 80;
      this.renderer.appendChild(div,img);
      this.renderer.appendChild(this.gameCanvas.nativeElement, div);
      //show cards with disabled click
      for(var i = 0;i < this.cards.length;i++){
        const div = this.renderer.createElement('div');
        var img = document.createElement('img');
        const cardvalue = this.cards[i].value;
        const cardcolor = this.cards[i].color;
        img.src = `../../../assets/cards/${cardcolor}/${cardcolor}_${cardvalue}.png`;
        img.height = 120;
        img.width = 80;
        this.renderer.addClass(div,'col-md-1');
        this.renderer.appendChild(div,img);
        this.renderer.appendChild(this.d1.nativeElement, div);
      }
    }
  } 
}
