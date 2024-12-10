import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { Post } from './models/post';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let appService: AppService;

  const mockPosts: Post[] = [
    {
      title: 'Post 1',
      userId: 1,
      id: 1,
      body: 'Body 1',
      displayProperty: 'title',
    },
    {
      title: 'Post 2',
      userId: 2,
      id: 2,
      body: 'Body 2',
      displayProperty: 'title',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);

    component.posts.set(mockPosts);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty post header content when it is not active', () => {
    const post = mockPosts[1];
    const headerContent = component.getPostHeaderContent(post);

    expect(headerContent).toBe('');
  });

  it('should cycle displayProperty', () => {
    const post = mockPosts[0];
    component.cyclePostDisplayProperty(post);
    fixture.detectChanges();

    expect(post.displayProperty).toBe('userId');

    component.cyclePostDisplayProperty(post);
    fixture.detectChanges();
    expect(post.displayProperty).toBe('id');

    component.cyclePostDisplayProperty(post);
    fixture.detectChanges();
    expect(post.displayProperty).toBe('body');

    component.cyclePostDisplayProperty(post);
    fixture.detectChanges();
    expect(post.displayProperty).toBe('title');
  });

  it('should reset the active post', () => {
    component.activePostId.set(1);
    component.showBackdrop.set(true);
    component.posts.set(mockPosts);

    component.resetPost();
    fixture.detectChanges();

    expect(component.activePostId()).toBeNull();
    expect(component.showBackdrop()).toBeFalse();
    expect(component.posts()[0].displayProperty).toBe('title');
  });

  it('should fire handlePostClick click', () => {
    const post = mockPosts[0];
    component.handlePostClick(post);
    fixture.detectChanges();

    expect(component.activePostId()).toBe(1);
    expect(component.showBackdrop()).toBeTrue();
  });

  it('should fire backdrop click', () => {
    component.activePostId.set(1);
    component.showBackdrop.set(true);
    component.posts.set(mockPosts);

    component.handleBackdropClick();
    fixture.detectChanges();

    expect(component.activePostId()).toBeNull();
    expect(component.showBackdrop()).toBeFalse();
    expect(component.posts()[0].displayProperty).toBe('title');
  });

  it('should fire handleBackdropClick on escape', () => {
    spyOn(component, 'handleBackdropClick');
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    component.onKeyup(event);
    expect(component.handleBackdropClick).toHaveBeenCalled();
  });

  it('should fire handlePostClick on enter', () => {
    const post = mockPosts[0];
    spyOn(component, 'handlePostClick');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    component.onKeyup(event, post);
    expect(component.handlePostClick).toHaveBeenCalledWith(post);
  });
});
