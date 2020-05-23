import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ViewContainerRef, Renderer2 } from '@angular/core';
import { User } from '../../classes/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Observable} from 'rxjs';
import { SocketService } from 'src/app/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { PickColorCardComponent } from '../../popups/pick-color-card/pick-color-card.component';
import { YourTurnPopupComponent } from 'src/app/popups/your-turn-popup/your-turn-popup.component';
import { GameStartedComponent } from 'src/app/popups/game-started/game-started.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('cards') private d1: ElementRef;
  @ViewChild('gameCanvas') private gameCanvas: ElementRef;
  @ViewChild('deck') private deck: ElementRef;
  @ViewChild('gameBoardColor') private gameBoardColor: ElementRef;

  userIsConnected: boolean = false;
  user:User;
  cards: any = [];
  cardOnBoard:any;
  colorOnBoard:string;
  gameStarted:boolean;
  deleteAllCards:boolean = false;
  turn:boolean = false;
  direction:number = 1;
  public playerOnTurn:string;
  alreadyPickedOneCard:boolean = false;
  host = UserService.host;

  constructor(private userService:UserService,private route: ActivatedRoute,private router: Router, 
    private socketService: SocketService, private elementRef:ElementRef, private renderer: Renderer2,public dialog: MatDialog) { 
  }

  checkIfGameStarted() {
    return this.gameStarted;
  }
  getPlayerOnTurn() {
    return this.playerOnTurn;
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
    const myElement = this.gameBoardColor.nativeElement;
    this.renderer.removeClass(myElement,"bg-danger");
    this.renderer.removeClass(myElement,"bg-primary");
    this.renderer.removeClass(myElement,"bg-success");
    this.renderer.removeClass(myElement,"bg-warning");
  }

  userConnected() {
    if(this.userIsConnected){
      return true;
    }
    return false;
  }

  turnOver() {
    this.turn = false;
    this.socketService.emit('turnOver','');
  }


  ngOnInit(): void {
    if(this.userIsConnected){
      this.socketService.listen('gameStarted').subscribe((data) => {
        console.log(this.user.username + "--game");
        this.userService.gameStart(this.user.username).subscribe((data) => {
          console.log(data);
        });
        const dialogRef=this.dialog.open(GameStartedComponent);
        setTimeout( () => {
          dialogRef.close();
        },500);
        this.gameStarted=true;
      });

      this.socketService.listen('cards').subscribe((data:any) => {
        this.cards = data.cards;
      });

      this.socketService.listen('cardOnBoard').subscribe((data:any) => {
        this.cardOnBoard = data;
        console.log(this.cardOnBoard);
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
        this.alreadyPickedOneCard = false;
        var dialogRef;
        dialogRef=this.dialog.open(YourTurnPopupComponent);
        
        setTimeout( () => {
          dialogRef.close();
        },1000);
        this.ngAfterViewInit();
      })

      this.socketService.listen('colorOnBoard').subscribe((data:string) => {
        this.colorOnBoard = data;
        const myEl = this.gameBoardColor.nativeElement;
        // this.renderer.removeClass(myEl,"bg-danger");
        // this.renderer.removeClass(myEl,"bg-primary");
        // this.renderer.removeClass(myEl,"bg-success");
        // this.renderer.removeClass(myEl,"bg-warning");
        this.renderer.removeClass(myEl,"red");
        this.renderer.removeClass(myEl,"green");
        this.renderer.removeClass(myEl,"blue");
        this.renderer.removeClass(myEl,"yellow");
        if(this.colorOnBoard === "Red"){
          console.log(this.colorOnBoard);
          // this.renderer.addClass(myEl,"bg-danger");
          this.renderer.addClass(myEl,"red");
        }
        else if(this.colorOnBoard === "Blue"){
          console.log(this.colorOnBoard);
          // this.renderer.addClass(myEl,"bg-primary");
          this.renderer.addClass(myEl,"blue");
        }
        else if(this.colorOnBoard === "Green"){
          console.log(this.colorOnBoard);
          // this.renderer.addClass(myEl,"bg-success");
          this.renderer.addClass(myEl,"green");
        }
        else if(this.colorOnBoard === "Yellow"){
          console.log(this.colorOnBoard);
          // this.renderer.addClass(myEl,"bg-warning");
          this.renderer.addClass(myEl,"yellow");
        } 
        //this.ngAfterViewInit();
      })

      this.socketService.listen('plusCards').subscribe((data:any) => {
        this.cards.push(data);
        this.deleteAllCards = true;
        this.ngAfterViewInit();
      })

      this.socketService.listen('direction').subscribe((data:number) => {
        this.direction = data;
      })

      this.socketService.listen('win').subscribe((data:string) => {
        window.alert(data + " WON");
      })

      this.socketService.listen('showTurn').subscribe((data:string) => {
        this.playerOnTurn = data;
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
    if(this.cards.length == 0 && this.gameStarted){
      this.socketService.emit('win',this.user.username);
      this.userService.gameWon(this.user.username).subscribe();
      this.gameStarted = false;
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
        this.renderer.addClass(div,'col');
        this.renderer.addClass(div,'col-centered');
        this.renderer.appendChild(div,img);
        this.renderer.listen(div, 'click' , () => {
          if(this.colorOnBoard === cardcolor || cardcolor === 'All' || this.cardOnBoard.value === cardvalue){
            //window.alert("You play: " + cardcolor + " " + cardvalue);
            this.colorOnBoard = cardcolor;
            this.socketService.emit('colorOnBoard',this.colorOnBoard);
            this.cardOnBoard = {value: cardvalue, color:this.colorOnBoard };
            if(cardcolor === "All"){
                const dialogRef=this.dialog.open(PickColorCardComponent, { 
                  disableClose: true,
                  data: {
                    cards: this.cards
                  } 
                });  
                dialogRef.afterClosed().subscribe(confirmresult=>{
                  this.colorOnBoard = confirmresult;  
                  this.socketService.emit('colorOnBoard',this.colorOnBoard);
                  this.socketService.emit('cardOnBoard',this.cardOnBoard);
                  this.renderer.removeChild(this.d1.nativeElement,div);
                  for(var j = 0;j<this.cards.length;j++){
                    if(this.cards[j].color === cardcolor && this.cards[j].value === cardvalue){
                      this.cards.splice(j,1);
                      break;
                    }
                  }
                  const childElements = this.gameCanvas.nativeElement.childNodes;
                  for (let child of childElements) {
                    this.renderer.removeChild(this.gameCanvas.nativeElement, child);
                  }
                  this.turn = false;
                  this.socketService.emit('turnOver','');
                }) 
            }
            else {
              if(this.cardOnBoard.value === "Reverse"){
                this.direction = -this.direction;
                this.socketService.emit('direction',this.direction);
              }
              else if(this.cardOnBoard.value === "Skip"){
                this.socketService.emit('skipNextPlayer','');
              }
              //////////////////
              this.socketService.emit('colorOnBoard',this.colorOnBoard);
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
          }
          else {
            console.log(this.colorOnBoard);
            window.alert("You can't play this card! Choose color " + this.colorOnBoard + "or value: " + this.cardOnBoard.value)
          }
        })  
        this.renderer.appendChild(this.d1.nativeElement, div);
      }
      //show deck with click for pulling cards
      const deckDiv = this.renderer.createElement('div');
      const deckImg = document.createElement('img');
      deckImg.src = '../../../assets/uno_deck_back.png';
      deckImg.height = 115;
      deckImg.width = 78;
      this.renderer.appendChild(deckDiv,deckImg);
      if(!this.alreadyPickedOneCard){
        this.alreadyPickedOneCard = true;
        this.renderer.listen(deckDiv, 'click', () => {
            this.socketService.emit('deck','');
        })
      }
      this.renderer.appendChild(this.deck.nativeElement,deckDiv); 
      //show on board card - last played card
      const boardCardDiv = this.renderer.createElement('div');
      var img = document.createElement('img');
      var color = this.cardOnBoard.color;
      var value = this.cardOnBoard.value;
      img.src = `../../../assets/cards/${color}/${color}_${value}.png`;
      img.height = 115;
      img.width = 78;
      this.renderer.appendChild(boardCardDiv,img);
      this.renderer.appendChild(this.gameCanvas.nativeElement, boardCardDiv);
    }
    else if(this.userIsConnected && !this.turn){
      //show deck with disabled click
      const deckDiv = this.renderer.createElement('div');
      const deckImg = document.createElement('img');
      deckImg.src = '../../../assets/uno_deck_back.png';
      deckImg.height = 115;
      deckImg.width = 78;
      this.renderer.appendChild(deckDiv,deckImg);
      this.renderer.appendChild(this.deck.nativeElement,deckDiv);
      //show on board card - last played card
      const div = this.renderer.createElement('div');
      var img = document.createElement('img');
      var color = this.cardOnBoard.color;
      var value = this.cardOnBoard.value;
      img.src = `../../../assets/cards/${color}/${color}_${value}.png`;
      img.height = 115;
      img.width = 78;
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
        this.renderer.addClass(div,'col');
        this.renderer.addClass(div,'col-centered');
        this.renderer.appendChild(div,img);
        this.renderer.appendChild(this.d1.nativeElement, div);
      }
    }
  } 
}
