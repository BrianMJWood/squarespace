import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  postContent = input<string | number | undefined>();
  postHeader = input<string>();
}
