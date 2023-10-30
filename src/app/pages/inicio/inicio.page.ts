import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public employeeName: string = 'Cargando...';

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    
    this.loadEmployeeName();
  }

  loadEmployeeName() {
    this.afAuth.user.subscribe(user => {
        if (user) {
            const currentEmployeeId = user.uid;
            this.db.object(`/EMPLEADOS/${currentEmployeeId}`).valueChanges().subscribe((employee: any) => {
                if (employee && employee.nombre && employee.apellido_p && employee.apellido_m) {
                    this.employeeName = `${employee.nombre} ${employee.apellido_p} ${employee.apellido_m}`;
                } else {
                    this.employeeName = 'Empleado desconocido';
                }
            });
        } else {
            this.employeeName = 'No autenticado';
        }
    });
}

}
