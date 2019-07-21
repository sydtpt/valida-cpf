import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidationComponent } from './validation/validation.component';
import { StatusComponent } from './status/status.component';

import { ListComponent } from './list/list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LottieAnimationViewModule } from 'ng-lottie';
import { BlockCpfComponent } from './block-cpf/block-cpf.component';
@NgModule({
  declarations: [
    AppComponent,
    ValidationComponent,
    StatusComponent,
    ListComponent,
    BlockCpfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    LottieAnimationViewModule.forRoot()
  ],
  entryComponents: [
    BlockCpfComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
