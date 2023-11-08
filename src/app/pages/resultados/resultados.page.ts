import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Prediction {
  name: string;
  value: number;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  predictionData: { predictions: Prediction[] } | null = null;
  insumoNames: string[] = [
    'Ácido Fórmico', 'Alambre Galvanizado', 'Cuchillas R2',
    'Cuchillas R1', 'Canaletas', 'Tazas de Recolección'
  ];

  constructor(private route: ActivatedRoute) {}

  // ...

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params && params['data']) {
      const data = JSON.parse(params['data']);
      
      if (Array.isArray(data.prediction)) {
        
        this.predictionData = {
          predictions: data.prediction.map((value: number, index: number) => {
            
            const name = index < this.insumoNames.length ? this.insumoNames[index] : `Insumo ${index + 1}`;
            return { name, value };
          })
        };
      } else {
      
        console.error('Formato de predicción incorrecto:', data.prediction);
      }
    }
  });
}

}



