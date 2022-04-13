import { BigInt } from '@graphprotocol/graph-ts';

export const generateCompositeId = (key1: string, key2: string): string => key1 + '-' + key2;

export const ZERO = BigInt.fromI32(0);
