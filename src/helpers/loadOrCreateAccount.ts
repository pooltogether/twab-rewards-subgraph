import { Account } from '../../generated/schema';

export function loadOrCreateAccount(id: string): Account {
  let account = Account.load(id);

  // create case
  if (account == null) {
    account = new Account(id);
  }

  return account as Account;
}
