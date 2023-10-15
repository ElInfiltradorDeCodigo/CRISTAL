import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil!: Observable<any>;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.perfil = this.loadPerfilData();
  }

  actualizarDatos() {
    this.perfil.subscribe(data => {
      this.router.navigate(['/cambiar-datos'], {
        state: { perfil: data }
      });
    });
  }
  

  loadPerfilData(): Observable<any> {
    return this.auth.authState.pipe(
      switchMap(user => {
        
        if (user) {
          
          return this.db.object(`EMPLEADOS/${user.uid}`).valueChanges();
        } else {
          
          return new Observable(subscriber => subscriber.next(null));
        }
      })
      );
  }

}
