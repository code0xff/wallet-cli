# Ethereum CLI Wallet

Node.js + TypeScript 기반 Ethereum 프로토콜 CLI 월렛입니다.

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

빌드 후 전역 링크로 실행할 수도 있습니다.

```bash
npm link
eth-wallet --help
```

## Security Notes

- keystore 파일은 `.wallet/keys` 아래에 암호화 JSON 형태로 저장됩니다.
- `.wallet/`과 `.env`는 Git 추적에서 제외됩니다.
- 실제 자금이 있는 메인넷 지갑에는 충분한 검토와 테스트 후 사용하세요.
