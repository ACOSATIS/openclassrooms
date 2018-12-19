import { Component, 
         Input, 
         OnInit } from '@angular/core';

import { Post }         from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post: Post;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  getColor() {
    if(this.post.loveIts > 0) {
      return 'green';
    } 
    else if(this.post.loveIts < 0) {
      return 'red';
    }
    else {
      return 'black';	
    }
  }

  loveItUp() {
    this.postsService.loveItUp(this.post);
  }

  loveItDown() {
    this.postsService.loveItDown(this.post);
  }

  onDeletePost() {
    this.postsService.removePost(this.post);
  }
}
