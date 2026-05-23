# Ethereum CLI Wallet

An Ethereum protocol CLI wallet built with Node.js and TypeScript.

## Setup

```bash
npm install
cp .env.example .env
npm run build
```

## Commands

```bash
npm run dev -- create --name main
npm run dev -- import --name imported --private-key 0x...
npm run dev -- address --name main
npm run dev -- balance --name main
npm run dev -- send --name main --to 0x... --amount 0.01
```

You can also build the project and run it through a global link.

```bash
npm link
eth-wallet --help
```

## Security Notes

- Keystore files are stored as encrypted JSON under `.wallet/keys`.
- `.wallet/` and `.env` are excluded from Git tracking.
- Use this with mainnet wallets that hold real funds only after sufficient review and testing.
