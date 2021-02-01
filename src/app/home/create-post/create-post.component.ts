import { Component } from '@angular/core';
import { JsonPlaceholderService } from '../../shared/json-placeholder/json-placeholder.service';
import { PlaceholderPost } from '../../shared/json-placeholder/json-placeholder.model';

@Component({
  selector: 'ns-create-post',
  providers: [JsonPlaceholderService],
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent {
  post: PlaceholderPost;

  constructor(private placeholderPostService: JsonPlaceholderService) {
    this.post = new PlaceholderPost;
  }

  addPost() {
    this.placeholderPostService.createPost(this.post)
    .subscribe(() => {
      alert('Successfully created a Post')
      this.post = new PlaceholderPost;
    },
    alert)
  }
}
