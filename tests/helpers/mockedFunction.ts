import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { createMockedFunction } from 'matchstick-as/assembly/index';

import { ticketAddress } from './assertField';

export const mockGetPromotionFunction = (
  event: ethereum.Event,
  promotionId: BigInt,
  creator: Address,
  startTimestamp: BigInt,
  numberOfEpochs: BigInt,
  epochDuration: BigInt,
  createdAt: BigInt,
  token: Address,
  tokensPerEpoch: BigInt,
  rewardsUnclaimed: BigInt,
): void => {
  createMockedFunction(
    event.address,
    'getPromotion',
    'getPromotion(uint256):((address,uint64,uint8,uint48,uint48,address,uint256,uint256))',
  )
    .withArgs([ethereum.Value.fromUnsignedBigInt(promotionId)])
    .returns([
      ethereum.Value.fromTuple(
        changetype<ethereum.Tuple>([
          ethereum.Value.fromAddress(creator),
          ethereum.Value.fromUnsignedBigInt(startTimestamp),
          ethereum.Value.fromUnsignedBigInt(numberOfEpochs),
          ethereum.Value.fromUnsignedBigInt(epochDuration),
          ethereum.Value.fromUnsignedBigInt(createdAt),
          ethereum.Value.fromAddress(token),
          ethereum.Value.fromUnsignedBigInt(tokensPerEpoch),
          ethereum.Value.fromUnsignedBigInt(rewardsUnclaimed),
        ]),
      ),
    ]);
};

export const mockTicketFunction = (event: ethereum.Event): void => {
  createMockedFunction(event.address, 'ticket', 'ticket():(address)').returns([
    ethereum.Value.fromAddress(ticketAddress),
  ]);
};
