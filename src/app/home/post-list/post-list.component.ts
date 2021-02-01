import { Component, OnInit } from '@angular/core';
import { UnsplashService } from '../../shared/unsplash/photo.service';

@Component({
  selector: 'ns-post-list',
  providers: [UnsplashService],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  unsplashAlbum;
  loadingImages = false;
  page = 1;

  constructor(private unsplashService: UnsplashService) { }

  ngOnInit() {
    this.getUnsplashList();
  }

  getPaginatedUnsplashedList(paginate: String) {
    switch (paginate) {
      case 'prev':
        this.page -= 1;
        this.getUnsplashList()
        break; 
      case 'next':
        this.page += 1;
        this.getUnsplashList()
        break;
      default:
        console.log('ERROR')
    }
  }

  getUnsplashList() {
    this.loadingImages = true;
    this.unsplashService.getUnsplash(this.page)
      .subscribe(
        (unsplashImages) => {
          this.unsplashAlbum = unsplashImages;
          this.loadingImages = false;
        },
        console.log
      )
  }
}
