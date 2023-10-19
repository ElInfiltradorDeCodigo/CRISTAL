import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-productor',
  templateUrl: './perfil-productor.page.html',
  styleUrls: ['./perfil-productor.page.scss'],
})
export class PerfilProductorPage implements OnInit {
  productor: any;

  constructor(private route: ActivatedRoute) {
    // Recupera el productor desde la ruta
    this.route.params.subscribe(params => {
      if (params['productor']) {
        this.productor = JSON.parse(params['productor']);
      }
    });
  }

  ngOnInit() {
  }
}
