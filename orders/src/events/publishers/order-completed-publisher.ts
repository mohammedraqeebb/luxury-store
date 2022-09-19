import { Publisher, Subjects, OrderCompletedEvent } from '@luxury-store/common';

export class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  readonly subject = Subjects.OrderCompleted;
}
