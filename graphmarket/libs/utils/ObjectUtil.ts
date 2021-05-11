export class ObjectUtil {
  public static isEmpty(obj: Object): boolean {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
