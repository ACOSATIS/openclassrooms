import { Component, 
	     Input,
	     OnDestroy,
	     OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post }         from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) {  }

  ngOnInit() {
  	this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  onNewPost() {
  	this.router.navigate(['/newPosts']);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
