import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function prompt(message: string): Promise<string> {
  const rl = createInterface({ input, output });

  try {
    const answer = await rl.question(message);
    return answer.trim();
  } finally {
    rl.close();
  }
}

export async function promptPassword(confirm = false): Promise<string> {
  const password = await prompt('Password: ');

  if (!password) {
    throw new Error('Password cannot be empty.');
  }

  if (confirm) {
    const confirmation = await prompt('Confirm password: ');

    if (password !== confirmation) {
      throw new Error('Passwords do not match.');
    }
  }

  return password;
}
