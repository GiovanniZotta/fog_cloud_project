import bcrypt from 'bcryptjs';

/**
 * Cryptography utility.
 */
export class CryptUtil {
  /**
   * Number of rounds for generating the salt.
   */
  private static readonly DEFAULT_SALT_ROUNDS: number = 12;

  /**
   * Asynchronously generates a hash for the given string.
   *
   * @param s - String to hash
   * @param rounds - Number of rounds to use
   * @returns Resulting hash
   */
  public static async hash(
    s: string,
    rounds: number = CryptUtil.DEFAULT_SALT_ROUNDS,
  ): Promise<string> {
    return bcrypt.hash(s, await bcrypt.genSalt(rounds));
  }

  /**
   * Synchronously generates a hash for the given string.
   *
   * @param s - String to hash
   * @param rounds - Number of rounds to use
   * @returns Resulting hash
   */
  public static hashSync(s: string, rounds: number = CryptUtil.DEFAULT_SALT_ROUNDS): string {
    return bcrypt.hashSync(s, bcrypt.genSaltSync(rounds));
  }

  /**
   * Asynchronously compares the given data against the given hash.
   *
   * @param s - Data to compare
   * @param hash - Data to be compared to
   * @returns True if matches, false otherwise
   */
  public static async compare(s: string, hash: string): Promise<boolean> {
    return bcrypt.compare(s, hash);
  }

  /**
   * Synchronously tests a string against a hash.
   *
   * @param s - Data to compare
   * @param hash - Data to be compared to
   * @returns True if matches, false otherwise
   */
  public static compareSync(s: string, hash: string): boolean {
    return bcrypt.compareSync(s, hash);
  }
}
