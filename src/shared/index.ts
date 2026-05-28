export type CamelToPascal<T extends string> =
  T extends `${infer FirstChar}${infer Rest}`
    ? `${Capitalize<FirstChar>}${Rest}`
    : never;

export type ComponentList<ComponentNames, ComponentType> = {
  [Prop in keyof ComponentNames as CamelToPascal<Prop & string>]: ComponentType;
};

export const hasA11yProp = (props: Record<string, unknown>) => {
  for (const prop in props) {
    if (prop.startsWith('aria-') || prop === 'role' || prop === 'title') {
      return true;
    }
  }
  return false;
};

export const mergeClasses = <ClassType = string | undefined | null>(
  ...classes: ClassType[]
) =>
  classes
    .filter((className, index, array) => {
      return (
        Boolean(className) &&
        (className as string).trim() !== '' &&
        array.indexOf(className) === index
      );
    })
    .join(' ')
    .trim();

export const toCamelCase = <T extends string>(string: T) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (_match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const toPascalCase = <T extends string>(string: T): CamelToPascal<T> => {
  const camelCase = toCamelCase(string);
  return (camelCase.charAt(0).toUpperCase() +
    camelCase.slice(1)) as CamelToPascal<T>;
};
