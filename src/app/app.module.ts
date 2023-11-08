import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyD1rjh0R0rYfF57uaaUXOJBzjumSdTcWk4",
  authDomain: "cristal-77a2a.firebaseapp.com",
  projectId: "cristal-77a2a",
  storageBucket: "cristal-77a2a.appspot.com",
  messagingSenderId: "932171344162",
  appId: "1:932171344162:web:16b3a744c9aba703781d7b"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    FormsModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,
    AngularFirestoreModule, AngularFireStorageModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
