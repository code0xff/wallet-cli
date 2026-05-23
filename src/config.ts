import 'dotenv/config';

export function getRpcUrl(): string {
  const rpcUrl = process.env.ETH_RPC_URL;

  if (!rpcUrl) {
    throw new Error('ETH_RPC_URL is required. Copy .env.example to .env and set a JSON-RPC endpoint.');
  }

  return rpcUrl;
}
