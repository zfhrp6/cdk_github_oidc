export const lowerCamelCase = (s: string): string => {
  return s
    .replace(/(_[a-zA-Z])/g, (group) => group.toUpperCase())
    .replace(/[-_]/g, '')
    .replace(/^./, (group) => group.toLowerCase());
};

export const upperCamelCase = (s: string): string => {
  return lowerCamelCase(s).replace(/^./, (group) => group.toUpperCase());
};

export const snakeCase = (s: string): string => {
  return s
    .replace(/[A-Z]/g, (group) => '_' + group.toLowerCase())
    .replace(/^_/, '')
    .replace(/(__|--)/g, '_');
};
