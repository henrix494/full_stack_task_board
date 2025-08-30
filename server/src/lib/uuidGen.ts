import { randomUUID } from "crypto";
export const genUUid = () => {
  const uuid = randomUUID();
  return uuid;
};
