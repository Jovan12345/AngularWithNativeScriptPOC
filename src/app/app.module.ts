import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule
} from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './home/post-list/post-list.component';
import { CameraComponent } from './home/camera/camera.component';
import { LocationComponent } from './home/location/location.component';
import { CreatePostComponent } from './home/create-post/create-post.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        PostListComponent,
        CameraComponent,
        LocationComponent,
        CreatePostComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
