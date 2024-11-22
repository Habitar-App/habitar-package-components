interface Object {
  [key: string]: any;
}

export function getObjectItem(object: Object | undefined | null, field: string): any {
  const chaves = field.split('.');
  let value = object;
  
  for (const chave of chaves) {
      if (value && typeof value === 'object' && chave in value) {
          value = value[chave];
      } else {
          return "";
      }
  }
  
  return value;
}