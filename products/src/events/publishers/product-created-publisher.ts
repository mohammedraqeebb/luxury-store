import { Subjects, Publisher, ProductCreatedEvent } from '@luxury-store/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
