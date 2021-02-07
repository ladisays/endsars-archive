export const userRoles = [
  { id: 1, label: 'Viewer', value: 1 },
  { id: 2, label: 'Verifier', value: 2 },
  { id: 3, label: 'Moderator', value: 3 },
  { id: 4, label: 'Administrator', value: 4 }
];

export const roles = {
  VIEWER: 1,
  VERIFIER: 2,
  MODERATOR: 3,
  ADMINISTRATOR: 4
};

export const getUserRole = (role) => userRoles.find((r) => r.value === role);

export const isOneOfRoles = (role, authorizedRoles = []) => {
  if (role && Array.isArray(authorizedRoles)) {
    return authorizedRoles.includes(role);
  }

  return role === authorizedRoles;
};

export const isAdmin = (role) => role === roles.ADMINISTRATOR;
export const isModerator = (role) => role === roles.MODERATOR;
export const isVerifier = (role) => role === roles.VERIFIER;
export const isViewer = (role) => role === roles.VIEWER;
export const isModeratorOrVerifier = (role) =>
  isOneOfRoles(role, [roles.MODERATOR, roles.VERIFIER]);
export const canModerate = (role) =>
  isOneOfRoles(role, [roles.ADMINISTRATOR, roles.MODERATOR]);
export const canVerify = (role) =>
  isOneOfRoles(role, [roles.VERIFIER, roles.MODERATOR, roles.ADMINISTRATOR]);
export const canView = (role) =>
  isOneOfRoles(role, [
    roles.VIEWER,
    roles.VERIFIER,
    roles.MODERATOR,
    roles.ADMINISTRATOR
  ]);
