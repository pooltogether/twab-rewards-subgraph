import { Address, BigInt } from '@graphprotocol/graph-ts';
import { assert } from 'matchstick-as/assembly/index';

export const creatorAddress = Address.fromString('0x897ea87eC79b9Fe5425f9f6c072c5Aa467bAdB0f');
export const creatorAccountId = creatorAddress.toHexString();

export const recipientAddress = Address.fromString('0x4D0F63398Ead972E11731E1EFb6A8E18307c787F');
export const recipientAccountId = recipientAddress.toHexString();

export const userAddress = Address.fromString('0x6DeFcD0a83bc6f9a70510d0186456eD9b22B1850');
export const userAccountId = userAddress.toHexString();

export const ticketAddress = Address.fromString('0x793e45332B7976Ead76E789A4876c68b5AB8430c');
export const tokenAddress = Address.fromString('0x03503F0D6013358D855634D2B58Baf6da132cD30');

export const assertAccountFields = (accountId: string, ticketAddress: Address): void => {
  assert.fieldEquals('Account', accountId, 'id', accountId);
  assert.fieldEquals('Account', accountId, 'ticket', ticketAddress.toHexString());
};

export const assertPromotionFields = (
  promotionId: string,
  creatorId: string,
  createdAt: i32,
  startTimestamp: i32,
  numberOfEpochs: i32,
  epochDuration: i32,
  tokensPerEpoch: i32,
  rewardsUnclaimed: i32,
  token: Address,
  ticket: Address,
  endedAt: BigInt | null = null,
  destroyedAt: BigInt | null = null,
): void => {
  assert.fieldEquals('Promotion', promotionId, 'id', promotionId);
  assert.fieldEquals('Promotion', promotionId, 'creator', creatorId);
  assert.fieldEquals('Promotion', promotionId, 'createdAt', createdAt.toString());

  if (endedAt) {
    assert.fieldEquals('Promotion', promotionId, 'endedAt', endedAt.toString());
  }

  if (destroyedAt) {
    assert.fieldEquals('Promotion', promotionId, 'destroyedAt', destroyedAt.toString());
  }

  assert.fieldEquals('Promotion', promotionId, 'startTimestamp', startTimestamp.toString());
  assert.fieldEquals('Promotion', promotionId, 'numberOfEpochs', numberOfEpochs.toString());
  assert.fieldEquals('Promotion', promotionId, 'epochDuration', epochDuration.toString());
  assert.fieldEquals('Promotion', promotionId, 'tokensPerEpoch', tokensPerEpoch.toString());
  assert.fieldEquals('Promotion', promotionId, 'rewardsUnclaimed', rewardsUnclaimed.toString());
  assert.fieldEquals('Promotion', promotionId, 'token', token.toHexString());
  assert.fieldEquals('Promotion', promotionId, 'ticket', ticket.toHexString());
};

export const assertClaimedPromotionFields = (
  id: string,
  accountId: string,
  epochs: string,
  rewards: i32,
  ticket: Address,
): void => {
  assert.fieldEquals('ClaimedPromotion', id, 'id', id);
  assert.fieldEquals('ClaimedPromotion', id, 'account', accountId);
  assert.fieldEquals('ClaimedPromotion', id, 'epochs', epochs);
  assert.fieldEquals('ClaimedPromotion', id, 'rewards', rewards.toString());
  assert.fieldEquals('ClaimedPromotion', id, 'ticket', ticket.toHexString());
};

export const assertTicketFields = (ticketId: string): void => {
  assert.fieldEquals('Ticket', ticketId, 'id', ticketId);
};
