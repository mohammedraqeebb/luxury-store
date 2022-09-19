import { Publisher, Subjects, OrderCreatedEvent } from '@luxury-store/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
