import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.page.html',
  styleUrls: ['./actualizar-empleado.page.scss'],
})
export class ActualizarEmpleadoPage implements OnInit {

      nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      correo: any;
      contrasena: any;
      sucursal: any;
      departamento: any;

  constructor(public toastController: ToastController,private route: ActivatedRoute,
              private db: AngularFireDatabase, private router: Router) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
    const empleadoUid = this.route.snapshot.paramMap.get('id'); 
    if (empleadoUid) {
        this.loadEmpleadoData(empleadoUid);
    } else {
        console.error('empleadoUid is undefined or null');
    }
}

loadEmpleadoData(empleadoUid: string): void {
  const empRef = this.db.object(`EMPLEADOS/${empleadoUid}`).valueChanges();
  empRef.subscribe(
      (data: any) => {
          if (data) {
              this.nombre = data.nombre;
              this.apellido_p = data.apellido_p;
              this.apellido_m = data.apellido_m;
              this.telefono = data.telefono;
              this.correo = data.correo;
              this.contrasena = data.contrasena;
              this.sucursal = data.sucursal;
              this.departamento = data.departamento;
          }
      },
      error => {
          console.error('Error al cargar empleado:', error);
      }
  );
}

guardarCambios() {
  const empleadoUid = this.route.snapshot.paramMap.get('id'); 
  if (empleadoUid) {
      this.actualizarDatosEmpleado(empleadoUid);
      this.router.navigate(['/empleados']);
  } else {
      console.error('empleadoUid is undefined or null');
  }
}

actualizarDatosEmpleado(empleadoUid: string) {
  this.db.object(`EMPLEADOS/${empleadoUid}`).update({
      nombre: this.nombre,
      apellido_p: this.apellido_p,
      apellido_m: this.apellido_m,
      telefono: this.telefono,
      contrasena: this.contrasena,
      sucursal: this.sucursal,
      departamento: this.departamento
  }).then(() => {
      this.datosCambiados(); 
  }).catch(error => {
      console.error('Error al actualizar datos del empleado:', error);
  });
}


}
