import type { Action, Resource } from '@documenso/packages/lib/permissions';

import usePermissions from './use-permissions';

const useCanAccess = () => {
  const { permissions, isError, isLoading } = usePermissions();

  const canAccess = (resource: Resource, actions: Action[]) => {
    return (permissions || []).some(
      (permission) =>
        permission.resource === resource &&
        (permission.actions === '*' ||
          permission.actions.some((action) => actions.includes(action)))
    );
  };

  return {
    isLoading,
    isError,
    canAccess,
  };
};

export default useCanAccess;
