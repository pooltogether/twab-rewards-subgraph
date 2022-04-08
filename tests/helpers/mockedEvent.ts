import { Address, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { PromotionCreated, PromotionEnded } from '../../generated/TWABRewards/TWABRewards';

export function createPromotionCreatedEvent(promotionId: i32): PromotionCreated {
  const mockEvent = newMockEvent();

  const promotionCreatedEvent = new PromotionCreated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  promotionCreatedEvent.parameters = new Array();

  const promotionIdParam = new ethereum.EventParam(
    'promotionId',
    ethereum.Value.fromI32(promotionId),
  );

  promotionCreatedEvent.parameters.push(promotionIdParam);

  return promotionCreatedEvent;
}

export function createPromotionEndedEvent(
  promotionId: i32,
  recipient: Address,
  amount: i32,
  epochNumber: i32,
): PromotionEnded {
  const mockEvent = newMockEvent();

  const promotionEndedEvent = new PromotionEnded(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  promotionEndedEvent.parameters = new Array();

  const promotionIdParam = new ethereum.EventParam(
    'promotionId',
    ethereum.Value.fromI32(promotionId),
  );

  const recipientParam = new ethereum.EventParam(
    'recipient',
    ethereum.Value.fromAddress(recipient),
  );

  const amountParam = new ethereum.EventParam('amount', ethereum.Value.fromI32(amount));

  const epochNumberParam = new ethereum.EventParam(
    'epochNumber',
    ethereum.Value.fromI32(epochNumber),
  );

  promotionEndedEvent.parameters.push(promotionIdParam);
  promotionEndedEvent.parameters.push(recipientParam);
  promotionEndedEvent.parameters.push(amountParam);
  promotionEndedEvent.parameters.push(epochNumberParam);

  return promotionEndedEvent;
}
