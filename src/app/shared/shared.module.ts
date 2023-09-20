import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';
import { LoaderService } from './components/loader/loader.service';
import { CommonApiService } from './services/common-api.service';
import { CookiesService } from './services/cookies.service';
import { AmountService } from './services/amount.service';
import { JwtHelperServices } from './services/jwt-helper.service';

const SHARED_COMPONENTS = [
  SafePipe,
  TruncatePipe,
  DecimalPipe,
];

const SINGLETON_SERVICES = [
  LoaderService,
  JwtHelperServices,
  CommonApiService,
  AmountService,
  CookiesService,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [
    CommonModule,
  ],
  exports: [
    ShowErrorsComponent,
    CommonModule,
    ...SHARED_COMPONENTS,
  ],
  providers: [
    CommonApiService,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...SINGLETON_SERVICES,
      ],
    };
  }
}

