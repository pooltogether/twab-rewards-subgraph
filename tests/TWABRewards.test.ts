import { BigInt } from '@graphprotocol/graph-ts';
import { clearStore, test } from 'matchstick-as/assembly/index';

import {
  assertAccountFields,
  assertPromotionFields,
  assertTicketFields,
  creatorAccountId,
  creatorAddress,
  recipientAddress,
  tokenAddress,
} from './helpers/assertField';
import { createPromotionCreatedEvent, createPromotionDestroyedEvent, createPromotionEndedEvent } from './helpers/mockedEvent';
import { mockGetPromotionFunction, mockTicketFunction } from './helpers/mockedFunction';
import { handlePromotionCreated, handlePromotionDestroyed, handlePromotionEnded } from '../src/mappings/TWABRewards';
import { Account, Promotion, Ticket } from '../generated/schema';
import { PromotionCreated, TWABRewards } from '../generated/TWABRewards/TWABRewards';

const promotionId = 1;
const createdAt = 1649271600;
const startTimestamp = 1649277643;
const epochDuration = 604800; // 1 week in seconds
const numberOfEpochs = 12;
const tokensPerEpoch = 1000;
const rewardsUnclaimed = numberOfEpochs * tokensPerEpoch;

const createPromotion = (): PromotionCreated => {
  const promotionCreatedEvent = createPromotionCreatedEvent(promotionId);

  mockGetPromotionFunction(
    promotionCreatedEvent,
    BigInt.fromI32(promotionId),
    creatorAddress,
    BigInt.fromI32(startTimestamp),
    BigInt.fromI32(numberOfEpochs),
    BigInt.fromI32(epochDuration),
    BigInt.fromI32(createdAt),
    tokenAddress,
    BigInt.fromI32(tokensPerEpoch),
    BigInt.fromI32(rewardsUnclaimed),
  );

  mockTicketFunction(promotionCreatedEvent);
  handlePromotionCreated(promotionCreatedEvent);

  return promotionCreatedEvent;
};

test('should handlePromotionCreated', () => {
  const promotionCreatedEvent = createPromotion();

  const twabRewardsContract = TWABRewards.bind(promotionCreatedEvent.address);
  const ticketAddress = twabRewardsContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const creatorAccount = Account.load(creatorAccountId) as Account;
  assertAccountFields(creatorAccount.id, ticketAddress);

  const promotion = Promotion.load(
    promotionCreatedEvent.params.promotionId.toHexString(),
  ) as Promotion;

  assertPromotionFields(
    promotion.id,
    creatorAccount.id,
    createdAt,
    startTimestamp,
    numberOfEpochs,
    epochDuration,
    tokensPerEpoch,
    rewardsUnclaimed,
    tokenAddress,
    ticketAddress,
  );

  clearStore();
});

test('should handlePromotionEnded', () => {
  createPromotion();

  // We end the promotion during the first epoch
  const promotionEndedEvent = createPromotionEndedEvent(
    promotionId,
    recipientAddress,
    rewardsUnclaimed - tokensPerEpoch,
    1,
  );

  handlePromotionEnded(promotionEndedEvent);

  const twabRewardsContract = TWABRewards.bind(promotionEndedEvent.address);
  const ticketAddress = twabRewardsContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const creatorAccount = Account.load(creatorAccountId) as Account;
  assertAccountFields(creatorAccount.id, ticketAddress);

  const promotion = Promotion.load(
    promotionEndedEvent.params.promotionId.toHexString(),
  ) as Promotion;

  assertPromotionFields(
    promotion.id,
    creatorAccount.id,
    createdAt,
    startTimestamp,
    numberOfEpochs,
    epochDuration,
    tokensPerEpoch,
    rewardsUnclaimed,
    tokenAddress,
    ticketAddress,
    promotionEndedEvent.block.timestamp,
  );

  clearStore();
});

test('should handlePromotionDestroyed', () => {
  createPromotion();

  // We destroy the promotion after the end of the last epoch
  const promotionDestroyedEvent = createPromotionDestroyedEvent(
    promotionId,
    recipientAddress,
    rewardsUnclaimed,
  );

  handlePromotionDestroyed(promotionDestroyedEvent);

  const twabRewardsContract = TWABRewards.bind(promotionDestroyedEvent.address);
  const ticketAddress = twabRewardsContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const creatorAccount = Account.load(creatorAccountId) as Account;
  assertAccountFields(creatorAccount.id, ticketAddress);

  const promotion = Promotion.load(
    promotionDestroyedEvent.params.promotionId.toHexString(),
  ) as Promotion;

  assertPromotionFields(
    promotion.id,
    creatorAccount.id,
    createdAt,
    startTimestamp,
    numberOfEpochs,
    epochDuration,
    tokensPerEpoch,
    rewardsUnclaimed,
    tokenAddress,
    ticketAddress,
    null,
    promotionDestroyedEvent.block.timestamp,
  );

  clearStore();
});
