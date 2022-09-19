import { Publisher, Subjects, PaymentChargedEvent } from '@luxury-store/common';

export class PaymentChargedPublisher extends Publisher<PaymentChargedEvent> {
  readonly subject = Subjects.PaymentCharged;
}
