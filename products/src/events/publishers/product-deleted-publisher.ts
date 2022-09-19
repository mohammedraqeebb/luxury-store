import { Subjects, Publisher, ProductDeletedEvent } from '@luxury-store/common';

export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  readonly subject = Subjects.ProductDeleted;
}
