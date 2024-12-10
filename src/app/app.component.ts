import { Component, signal, effect, computed } from '@angular/core';
import { AppService } from './app.service';
import { Post } from './models/post';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostComponent],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  posts = signal<Post[]>([]);
  activePostId = signal<number | null>(null);
  showBackdrop = signal<boolean>(false);

  headerText = computed(
    () => `Current active post ID: ${this.activePostId() ?? 'None chosen'}`
  );

  constructor(private appService: AppService) {
    this.fetchPosts();
  }

  fetchPosts() {
    this.appService.getPosts().subscribe((posts) => {
      this.posts.set(
        posts.map((post) => ({
          ...post,
          displayProperty: 'title',
        }))
      );
    });
  }

  getPostContent(post: Post) {
    const propertyMap: { [key: string | number]: string | number } = {
      title: post.title,
      userId: post.userId,
      id: post.id,
      body: post.body,
    };
    return propertyMap[post.displayProperty ?? 'title'];
  }

  getPostHeaderContent(post: Post) {
    return this.activePostId() === post.id ? `${post.displayProperty}:` : '';
  }

  cyclePostDisplayProperty(post: Post): void {
    switch (post.displayProperty) {
      case 'title':
        post.displayProperty = 'userId';
        break;
      case 'userId':
        post.displayProperty = 'id';
        break;
      case 'id':
        post.displayProperty = 'body';
        break;
      case 'body':
      default:
        post.displayProperty = 'title';
        break;
    }
    this.posts.update((currentPosts) =>
      currentPosts.map((p) => (p.id === post.id ? { ...post } : p))
    );
  }

  handlePostClick(post: Post) {
    if (this.activePostId() && this.activePostId() !== post.id) {
      this.resetPost();
    }

    if (this.activePostId() === post.id) {
      this.cyclePostDisplayProperty(post);
    }

    this.showBackdrop.set(true);
    this.activePostId.set(post.id);
  }

  resetPost() {
    this.posts.update((currentPosts) =>
      currentPosts.map((post) =>
        post.id === this.activePostId()
          ? { ...post, displayProperty: 'title' }
          : post
      )
    );
    this.activePostId.set(null);
    this.showBackdrop.set(false);
  }

  handleBackdropClick() {
    this.showBackdrop.set(false);
    this.resetPost();
  }

  onKeyup(event: KeyboardEvent, post?: Post) {
    if (event.key === 'Escape') {
      this.handleBackdropClick();
    }
    if (event.key === 'Enter' && post) {
      this.handlePostClick(post);
    }
  }
}
