import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadPosts,
  setActivePost,
  resetActivePost,
  setBackdropFalse,
  toggleGridMode,
} from './state/app.actions';
import { Post } from './models/post';
import { PostComponent } from './post/post.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  selectPosts,
  selectActivePostId,
  selectShowBackdrop,
  selectIsFlexible,
} from './state/app.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostComponent, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  posts$: Observable<Post[]> = this.store.select(selectPosts);
  activePostId$: Observable<number | null> =
    this.store.select(selectActivePostId);
  showBackdrop$: Observable<boolean> = this.store.select(selectShowBackdrop);
  isFlexible$: Observable<boolean> = this.store.select(selectIsFlexible);

  constructor(private store: Store) {
    this.store.dispatch(loadPosts());
  }

  handlePostClick(post: Post) {
    this.store.dispatch(setActivePost({ postId: post.id }));
  }

  toggleBackdropOff() {
    this.store.dispatch(resetActivePost());
    this.store.dispatch(setBackdropFalse());
  }

  onKeyup(event: KeyboardEvent, post?: Post) {
    if (event.key === 'Escape') {
      this.toggleBackdropOff();
    }
    if (event.key === 'Enter' && post) {
      this.handlePostClick(post);
    }
  }

  toggleGridMode() {
    this.store.dispatch(toggleGridMode());
  }
}
