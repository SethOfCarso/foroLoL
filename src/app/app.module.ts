import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
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
import { PostCreateComponent } from './post/post-main/post-create/post-create.component';
// For rich text Editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
import { ProfileComponent } from './users/profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ChangePasswordComponent } from './users/profile/change-password/change-password.component';
import { ChangeEmailComponent } from './users/profile/change-email/change-email.component';
import { UploadImageComponent } from './uploads/upload-image/upload-image.component';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';


import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

const config: SocketIoConfig = { url: environment.url,  options: {} };
import { PostSearchedComponent } from './post/post-main/post-searched/post-searched.component';

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
    PostCreateComponent,
    ProfileComponent,
    ChatComponent,
    LogInComponent,
    SignInComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    UploadImageComponent,
    ConversationComponent,
    ChatMessagesComponent,
    PostSearchedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
