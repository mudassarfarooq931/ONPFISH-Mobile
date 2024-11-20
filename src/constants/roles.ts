export enum RolesEnum {
  Administrator = 'Administrator',
  User = 'User',
}

export namespace RolesEnum {
  export const valueToKey = (value: String): RolesEnum =>
    RolesEnum[value as keyof typeof RolesEnum] as RolesEnum;

  export const getString = (value: RolesEnum): string => {
    return RolesEnum[value];
  };
}
