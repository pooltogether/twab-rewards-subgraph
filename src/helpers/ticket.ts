import { Address } from '@graphprotocol/graph-ts';

export function setTicket<Entity>(entity: Entity, ticket: Address): void {
  // If just created set ticket field
  if (entity.ticket == null) {
    entity.ticket = ticket.toHexString();
  }
}
