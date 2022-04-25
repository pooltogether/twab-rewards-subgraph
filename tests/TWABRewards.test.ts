import { BigInt } from '@graphprotocol/graph-ts';
import { clearStore, test } from 'matchstick-as/assembly/index';

import {
  assertAccountFields,
  assertClaimedPromotionFields,
  assertPromotionFields,
  assertTicketFields,
  creatorAccountId,
  creatorAddress,
  recipientAddress,
  tokenAddress,
  userAddress,
  userAccountId,
} from './helpers/assertField';
import { createPromotionCreatedEvent, createPromotionDestroyedEvent, createPromotionEndedEvent, createPromotionExtendedEvent, createRewardsClaimedEvent } from './helpers/mockedEvent';
import { mockGetPromotionFunction, mockTicketFunction } from './helpers/mockedFunction';
import { handlePromotionCreated, handlePromotionDestroyed, handlePromotionEnded, handlePromotionExtended, handleRewardsClaimed } from '../src/mappings/TWABRewards';
import { Account, Promotion, Ticket } from '../generated/schema';
import { PromotionCreated, TWABRewards } from '../generated/TWABRewards/TWABRewards';
import { generateCompositeId } from '../src/helpers/common';

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

test('should handlePromotionExtended', () => {
  createPromotion();

  // We extend the promotion by 12 epochs
  const promotionExtendedEvent = createPromotionExtendedEvent(
    promotionId,
    numberOfEpochs
  );

  mockGetPromotionFunction(
    promotionExtendedEvent,
    BigInt.fromI32(promotionId),
    creatorAddress,
    BigInt.fromI32(startTimestamp),
    BigInt.fromI32(numberOfEpochs * 2),
    BigInt.fromI32(epochDuration),
    BigInt.fromI32(createdAt),
    tokenAddress,
    BigInt.fromI32(tokensPerEpoch),
    BigInt.fromI32(rewardsUnclaimed * 2),
  );

  handlePromotionExtended(promotionExtendedEvent);

  const twabRewardsContract = TWABRewards.bind(promotionExtendedEvent.address);
  const ticketAddress = twabRewardsContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const creatorAccount = Account.load(creatorAccountId) as Account;
  assertAccountFields(creatorAccount.id, ticketAddress);

  const promotion = Promotion.load(
    promotionExtendedEvent.params.promotionId.toHexString(),
  ) as Promotion;

  assertPromotionFields(
    promotion.id,
    creatorAccount.id,
    createdAt,
    startTimestamp,
    numberOfEpochs * 2,
    epochDuration,
    tokensPerEpoch,
    rewardsUnclaimed * 2,
    tokenAddress,
    ticketAddress,
  );

  clearStore();
});

test('should handleRewardsClaimed', () => {
  createPromotion();

  const rewardsClaimed = tokensPerEpoch * 6;

  const rewardsClaimedEvent = createRewardsClaimedEvent(
    promotionId,
    [0,1,2,3,4,5],
    userAddress,
    rewardsClaimed
  );

  mockGetPromotionFunction(
    rewardsClaimedEvent,
    BigInt.fromI32(promotionId),
    creatorAddress,
    BigInt.fromI32(startTimestamp),
    BigInt.fromI32(numberOfEpochs),
    BigInt.fromI32(epochDuration),
    BigInt.fromI32(createdAt),
    tokenAddress,
    BigInt.fromI32(tokensPerEpoch),
    BigInt.fromI32(rewardsUnclaimed / 2),
  );

  handleRewardsClaimed(rewardsClaimedEvent);

  const twabRewardsContract = TWABRewards.bind(rewardsClaimedEvent.address);
  const ticketAddress = twabRewardsContract.ticket();

  const ticket = Ticket.load(ticketAddress.toHexString()) as Ticket;
  assertTicketFields(ticket.id);

  const userAccount = Account.load(userAccountId) as Account;
  assertAccountFields(userAccount.id, ticketAddress);

  const promotion = Promotion.load(
    rewardsClaimedEvent.params.promotionId.toHexString(),
  ) as Promotion;


  const creatorAccount = Account.load(creatorAccountId) as Account;

  assertPromotionFields(
    promotion.id,
    creatorAccount.id,
    createdAt,
    startTimestamp,
    numberOfEpochs,
    epochDuration,
    tokensPerEpoch,
    rewardsUnclaimed / 2,
    tokenAddress,
    ticketAddress,
  );

  const claimedPromotionId = generateCompositeId(userAccountId, promotion.id);

  assertClaimedPromotionFields(
    claimedPromotionId,
    userAccountId,
    '[0, 1, 2, 3, 4, 5]',
    rewardsClaimed,
    ticketAddress
  );

  clearStore();
});
