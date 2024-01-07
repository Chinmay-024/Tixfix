import { Publisher, Subjects, TicketCreatedEvent } from "@tixfix/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
