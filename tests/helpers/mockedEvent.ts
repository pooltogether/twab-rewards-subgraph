import { Address, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { PromotionCreated, PromotionDestroyed, PromotionEnded, PromotionExtended } from '../../generated/TWABRewards/TWABRewards';

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

export function createPromotionDestroyedEvent(
  promotionId: i32,
  recipient: Address,
  amount: i32,
): PromotionDestroyed {
  const mockEvent = newMockEvent();

  const promotionDestroyedEvent = new PromotionDestroyed(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  promotionDestroyedEvent.parameters = new Array();

  const promotionIdParam = new ethereum.EventParam(
    'promotionId',
    ethereum.Value.fromI32(promotionId),
  );

  const recipientParam = new ethereum.EventParam(
    'recipient',
    ethereum.Value.fromAddress(recipient),
  );

  const amountParam = new ethereum.EventParam('amount', ethereum.Value.fromI32(amount));

  promotionDestroyedEvent.parameters.push(promotionIdParam);
  promotionDestroyedEvent.parameters.push(recipientParam);
  promotionDestroyedEvent.parameters.push(amountParam);

  return promotionDestroyedEvent;
}

export function createPromotionExtendedEvent(
  promotionId: i32,
  numberOfEpochs: i32,
): PromotionExtended {
  const mockEvent = newMockEvent();

  const promotionExtendedEvent = new PromotionExtended(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );

  promotionExtendedEvent.parameters = new Array();

  const promotionIdParam = new ethereum.EventParam(
    'promotionId',
    ethereum.Value.fromI32(promotionId),
  );

  const numberOfEpochsParam = new ethereum.EventParam(
    'numberOfEpochs',
    ethereum.Value.fromI32(numberOfEpochs),
  );

  promotionExtendedEvent.parameters.push(promotionIdParam);
  promotionExtendedEvent.parameters.push(numberOfEpochsParam);

  return promotionExtendedEvent;
}
