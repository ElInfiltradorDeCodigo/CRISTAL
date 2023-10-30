import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportesPageRoutingModule } from './reportes-routing.module';
import { ReportesPage } from './reportes.page';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesPageRoutingModule,
    NgChartsModule
  ],
  declarations: [ReportesPage]
})
export class ReportesPageModule {}
