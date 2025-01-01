import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the postHeader and postContent', () => {
    fixture.componentRef.setInput('postHeader', 'test header');
    fixture.componentRef.setInput('postContent', 'Test content');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('h2');
    const content = compiled.querySelector('.post-content');

    expect(header?.textContent).toBe('Test Header');
    expect(content?.textContent?.trim()).toContain('Test content');
  });
});
