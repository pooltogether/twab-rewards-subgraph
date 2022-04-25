import { Address, BigInt } from '@graphprotocol/graph-ts';

import { ClaimedPromotion } from '../../generated/schema';
import { ZERO } from './common';

export function setClaimedPromotion(
  claimedPromotion: ClaimedPromotion,
  user: Address,
  epochIds: i32[],
  amount: BigInt,
): void {
  claimedPromotion.account = user.toHexString();

  if (claimedPromotion.epochs) {
    if (epochIds.length > 0) {
      const epochs = claimedPromotion.epochs as BigInt[];

      for (let i = 0; i < epochIds.length; i++) {
        const epochId = BigInt.fromI32(epochIds[i]);
        epochs.push(epochId);
      }

      claimedPromotion.epochs = epochs;
    }
  } else {
    if (epochIds.length > 0) {
      const epochIdsToBigInt = [] as BigInt[];

      for (let i = 0; i < epochIds.length; i++) {
        epochIdsToBigInt.push(BigInt.fromI32(epochIds[i]))
      }

      claimedPromotion.epochs = epochIdsToBigInt;
    }
  }

  if (claimedPromotion.rewards) {
    if (amount.gt(ZERO)) {
      claimedPromotion.rewards = claimedPromotion.rewards.plus(amount);
    }
  } else {
    claimedPromotion.rewards = amount;
  }
}
