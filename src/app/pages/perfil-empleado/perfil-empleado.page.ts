import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.page.html',
  styleUrls: ['./perfil-empleado.page.scss'],
})
export class PerfilEmpleadoPage implements OnInit {

   empleadoId: string | null = null;
   empleado: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {

    const empleadoUid = this.route.snapshot.paramMap.get('empleadoUid');
    console.log('empleadoUid:', empleadoUid);
    if (empleadoUid) {
      this.loadEmpleado(empleadoUid);
  } else {
      console.error('empleadoUid from route is undefined or null');
  }

  }

  loadEmpleado(empleadoUid: string): void {
    const empRef = this.db.object(`EMPLEADOS/${empleadoUid}`).valueChanges();

    // Suscribiéndose a los cambios de los datos del empleado y asignándolos a 'this.empleado'.
    empRef.subscribe(
        data => {
            console.log('Empleado Data:', data);  // Consigna los datos para depuración.
            this.empleado = data;
        },
        error => {
            console.error('Error al cargar empleado:', error);  // Muestra errores si los hay.
        }
    );
  }

}
