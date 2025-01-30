

export const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

export const getFirstName = (name: string) => {
    return name.split(' ')[0];
};