import crypto from 'crypto';

export const generateTempPassword = (): string => {
  const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const special = '!@#$%&*';

  const pick = (str: string) => str[crypto.randomInt(str.length)];

  const required = [pick(upper), pick(lower), pick(digits), pick(special)];

  const all = upper + lower + digits + special;
  for (let i = 0; i < 4; i++) required.push(pick(all));

  return required.sort(() => Math.random() - 0.5).join('');
};
