import { BigInt } from '@graphprotocol/graph-ts';
import { clearStore, test } from 'matchstick-as/assembly/index';

import {
  assertAccountFields,
  assertPromotionFields,
  assertTicketFields,
  creatorAccountId,
  creatorAddress,
  tokenAddress,
} from './helpers/assertField';
import { createPromotionCreatedEvent } from './helpers/mockedEvent';
import { mockGetPromotionFunction, mockTicketFunction } from './helpers/mockedFunction';
import { handlePromotionCreated } from '../src/mappings/TWABRewards';
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
