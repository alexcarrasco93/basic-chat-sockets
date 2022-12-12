import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MyMapComponent } from './map.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MyMapComponent],
  imports: [
    CommonModule,
    NavbarComponent,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiYWxleGNhcnJhc2NvOTMiLCJhIjoiY2xia3lpeTk1MDJlejNvbzlhM2NzcnA0MCJ9._v4oU3L9Xvk4MdxKrbwgbA',
    }),
    RouterModule.forChild([{ path: '', component: MyMapComponent }]),
  ],
})
export class MapModule {}
