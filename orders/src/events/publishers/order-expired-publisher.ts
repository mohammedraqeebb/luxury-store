import { OrderExpiredEvent, Publisher, Subjects } from '@luxury-store/common';

export class OrderExpiredPublisher extends Publisher<OrderExpiredEvent> {
  readonly subject = Subjects.OrderExpired;
}
