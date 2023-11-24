import { createHash } from "crypto";

export class CryptoAdapter {
  static hash(password: string): string {
    return createHash("sha256").update(password).digest("hex");
  }

  static compare(password: string, hashed: string): boolean {
    const enteredPasswordHash = CryptoAdapter.hash(password);
    return enteredPasswordHash === hashed;
  }
}
