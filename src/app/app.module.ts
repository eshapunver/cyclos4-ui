import { NgModule } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ApiModule } from 'app/api/api.module';
import { INIT_API_CONFIGURATION } from 'app/bootstrap/init-api-configuration';
import { LOAD_GENERAL_TRANSLATION } from 'app/bootstrap/load-general-translation';
import { LOAD_DATA_FOR_UI } from 'app/bootstrap/load-data-for-ui';
import { LOAD_USER } from 'app/bootstrap/load-user';
import { LoginModule } from 'app/login/login.module';
import { CoreModule } from 'app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

/**
 * Root application module
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,

    // LoginModule is here to make it eagerly loaded
    LoginModule,

    AppRoutingModule
  ],
  providers: [
    INIT_API_CONFIGURATION,
    LOAD_GENERAL_TRANSLATION,
    LOAD_DATA_FOR_UI,
    LOAD_USER
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
