import { ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';

import { PromotionCreated } from '../../generated/TWABRewards/TWABRewards';

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
