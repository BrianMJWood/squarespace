import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import {
  resetActivePost,
  setActivePost,
  setBackdropFalse,
} from './state/app.actions';
import { Post } from './models/post';
import { selectPosts, selectActivePostId } from './state/app.selectors';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let store: MockStore;
  const mockPosts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Body 1',
      displayProperty: 'title',
    },
    {
      id: 2,
      userId: 2,
      title: 'Post 2',
      body: 'Body 2',
      displayProperty: 'title',
    },
  ];

  const initialState = {
    app: {
      posts: mockPosts,
      activePostId: null,
      showBackdrop: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore({ initialState }), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty post header content when it is not active', () => {
    store.overrideSelector(selectPosts, mockPosts);
    mockPosts.forEach((post) => {
      expect(post.displayProperty).toBe('title');
    });
  });

  it('should reset the active post', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.toggleBackdropOff();
    expect(dispatchSpy).toHaveBeenCalledWith(resetActivePost());
    expect(dispatchSpy).toHaveBeenCalledWith(setBackdropFalse());
  });

  it('should fire handlePostClick click', () => {
    const post = mockPosts[0];
    const dispatchSpy = spyOn(store, 'dispatch');

    store.overrideSelector(selectActivePostId, null);
    fixture.detectChanges();
    component.handlePostClick(post);
    expect(dispatchSpy).toHaveBeenCalledWith(
      setActivePost({ postId: post.id })
    );
  });

  it('should fire backdrop click and reset state', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.toggleBackdropOff();
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(resetActivePost());
    expect(dispatchSpy).toHaveBeenCalledWith(setBackdropFalse());
  });

  it('should fire handleBackdropClick on escape', () => {
    const dispatchSpy = spyOn(component, 'toggleBackdropOff');
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    component.onKeyup(event);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should fire handlePostClick on enter', () => {
    const post = mockPosts[0];
    const dispatchSpy = spyOn(component, 'handlePostClick');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    component.onKeyup(event, post);
    expect(dispatchSpy).toHaveBeenCalledWith(post);
  });
});
