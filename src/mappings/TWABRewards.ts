import {
  PromotionCreated,
  PromotionDestroyed,
  PromotionEnded,
  PromotionExtended,
  RewardsClaimed,
  TWABRewards,
} from '../../generated/TWABRewards/TWABRewards';
import { generateCompositeId } from '../helpers/common';
import { setClaimedPromotion } from '../helpers/claimedPromotion';
import { setPromotion, setPromotionDestroyedAt, setPromotionEndedAt } from '../helpers/promotion';
import { setTicket } from '../helpers/ticket';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { loadOrCreateClaimedPromotion } from '../helpers/loadOrCreateClaimedPromotion';
import { loadOrCreatePromotion } from '../helpers/loadOrCreatePromotion';
import { loadOrCreateTicket } from '../helpers/loadOrCreateTicket';

export function handlePromotionCreated(event: PromotionCreated): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handlePromotionEnded(event: PromotionEnded): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);
  setPromotionEndedAt(promotion, event.block.timestamp);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handlePromotionDestroyed(event: PromotionDestroyed): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);
  setPromotionDestroyedAt(promotion, event.block.timestamp);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handlePromotionExtended(event: PromotionExtended): void {
  const promotionId = event.params.promotionId;

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const creator = loadOrCreateAccount(promotionInfo.creator.toHexString());
  setTicket(creator, ticketAddress);
  setTicket(promotion, ticketAddress);

  creator.save();
  promotion.save();
}

export function handleRewardsClaimed(event: RewardsClaimed): void {
  const promotionId = event.params.promotionId;
  const user = event.params.user;
  const epochIds = event.params.epochIds;
  const amount = event.params.amount;

  const claimedPromotionId = generateCompositeId(user.toHexString(), promotionId.toHexString());
  const claimedPromotion = loadOrCreateClaimedPromotion(claimedPromotionId);
  setClaimedPromotion(claimedPromotion, promotionId, user, epochIds, amount);

  const twabRewardsContract = TWABRewards.bind(event.address);
  const promotion = loadOrCreatePromotion(promotionId.toHexString());

  const promotionInfo = twabRewardsContract.getPromotion(promotionId);
  setPromotion(promotion, promotionInfo);

  const ticketAddress = twabRewardsContract.ticket();
  loadOrCreateTicket(ticketAddress.toHexString());

  const account = loadOrCreateAccount(user.toHexString());
  setTicket(account, ticketAddress);
  setTicket(claimedPromotion, ticketAddress);

  account.save();
  claimedPromotion.save();
  promotion.save();
}
