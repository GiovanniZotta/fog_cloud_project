/**
 * URL utility.
 */
export class UrlUtil {
  /**
   * Returns the base URL from the given url.
   *
   * @param url - URL to extract the base url from
   * @returns Base URL of the url
   */
  public static baseUrl(url: string): string | undefined {
    const baseUrl = url.match(/^.+?[^/:](?=[?/]|$)/);
    return baseUrl && baseUrl.length > 0 ? baseUrl[0] : undefined;
  }

  /**
   * Add the trailing slash '/' to the given url.
   *
   * @param url - URL to add the trailing slash to
   * @returns url with trailing slash
   */
  public static addTrailingSlash(url: string): string {
    return url.replace(/\/?$/, '/');
  }

  /**
   * Remove the trailing slash '/' from the given url.
   *
   * @param url - URL to remove the trailing slash from
   * @returns url without trailing slash
   */
  public static removeTrailingSlash(url: string): string {
    return url.replace(/\/$/, '');
  }
}
