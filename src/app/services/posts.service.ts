import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import * as firebase     from 'firebase/app';
import 'firebase/database';
import { DataSnapshot }  from 'firebase/database';

import { Post } from '../models/post.model';

@Injectable()
export class PostsService {

  posts: Post[];
  postsSubject = new Subject<Post[]>();

  constructor() { 
  	this.getPosts();
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
  	firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  createNewPost(newPost: Post) {
  	newPost.loveIts = 0;

  	if (this.posts.length==0) {
  		newPost.id = 1;
  	}
  	else {
      newPost.id = this.posts.slice(-1)[0].id + 1;
  	}

    newPost.created_at_ts = Date.now();
    this.posts.push(newPost);

    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );

    this.posts.splice(postIndexToRemove, 1);

    this.savePosts();
    this.emitPosts();
  }

  loveItUp(post: Post) {
    this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          postEl.loveIts += 1;
          return true;
        }
      }
    );

    this.savePosts();
    this.emitPosts();
  }

  loveItDown(post: Post) {
    this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          postEl.loveIts -= 1;
          return true;
        }
      }
    );

    this.savePosts();
    this.emitPosts();
  }

}
