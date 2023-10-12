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

const firebaseConfig = {
  apiKey: "AIzaSyBlM6lYCYgw7L4D4-vc4xH3E4T1JkZ2sXE",
  authDomain: "almacen-progomex.firebaseapp.com",
  databaseURL: "https://almacen-progomex-default-rtdb.firebaseio.com",
  projectId: "almacen-progomex",
  storageBucket: "almacen-progomex.appspot.com",
  messagingSenderId: "674990334647",
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    FormsModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,
    AngularFirestoreModule, AngularFireStorageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
