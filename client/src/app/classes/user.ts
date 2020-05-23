export class User {
    _id: string;
    name:string;
    lastname:string;
    username:string;    
    password:string;
    email:string;
    country:string;
    city:string;
    address:string;
    age:number;
    gender:string;
    zip:number;
    picture_path:string;
    gameSettings: {
        gamesPlayed:number;
        wins:number;
    }
}