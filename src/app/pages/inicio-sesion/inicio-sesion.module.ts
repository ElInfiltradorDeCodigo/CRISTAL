import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';
import { InicioSesionPage } from './inicio-sesion.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    AngularFireAuthModule,
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
