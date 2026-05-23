import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { HDNodeWallet, Wallet } from 'ethers';

export type StoredWallet = Wallet | HDNodeWallet;

const keyDir = join(process.cwd(), '.wallet', 'keys');

function assertWalletName(name: string): void {
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error('Wallet name may only contain letters, numbers, underscores, and hyphens.');
  }
}

export function getKeystorePath(name: string): string {
  assertWalletName(name);
  return join(keyDir, `${name}.json`);
}

export async function saveWallet(name: string, wallet: StoredWallet, password: string): Promise<string> {
  await mkdir(keyDir, { recursive: true, mode: 0o700 });

  const encryptedJson = await wallet.encrypt(password);
  const path = getKeystorePath(name);

  await writeFile(path, `${encryptedJson}\n`, { encoding: 'utf8', mode: 0o600 });
  return path;
}

export async function loadWallet(name: string, password: string): Promise<StoredWallet> {
  const path = getKeystorePath(name);
  const encryptedJson = await readFile(path, 'utf8');
  return Wallet.fromEncryptedJson(encryptedJson, password);
}
