import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { PostMainComponent } from './post/post-main/post-main.component';
import { PostListComponent } from './post/post-main/post-list/post-list.component';
import { PostDetailComponent } from './post/post-main/post-detail/post-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './users/profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ChangePasswordComponent } from './users/profile/change-password/change-password.component';
import { ChangeEmailComponent } from './users/profile/change-email/change-email.component';
import { UploadImageComponent } from './uploads/upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    PostComponent,
    PostMainComponent,
    PostListComponent,
    PostDetailComponent,
    ProfileComponent,
    ChatComponent,
    LogInComponent,
    SignInComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
