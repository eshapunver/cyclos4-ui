import { Component, Injector, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseBankingComponent } from 'app/banking/base-banking.component';
import { TransactionView, AuthorizationStatusEnum } from 'app/api/models';
import { ApiHelper } from 'app/shared/api-helper';

/**
 * Displays a confirmation that the payment was performed
 */
@Component({
  selector: 'payment-done',
  templateUrl: 'payment-done.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDoneComponent extends BaseBankingComponent {
  constructor(
    injector: Injector) {
    super(injector);
  }

  @Input()
  payment: TransactionView;

  get from(): string {
    return ApiHelper.accountName(this.generalMessages, true, this.payment);
  }

  get to(): string {
    return ApiHelper.accountName(this.generalMessages, false, this.payment);
  }

  get pendingAuth(): boolean {
    return this.payment.authorizationStatus === AuthorizationStatusEnum.PENDING;
  }
}
