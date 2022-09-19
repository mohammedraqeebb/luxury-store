import { Subjects, Publisher, ProductUpdatedEvent } from '@luxury-store/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
}
