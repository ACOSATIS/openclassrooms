export class Post {
  id: number;
  loveIts: number;
  created_at_ts: number;
 
  constructor( public title: string,
               public content: string) { }
}