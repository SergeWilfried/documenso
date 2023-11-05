/* eslint-disable require-atomic-updates */
import jackson, {
  IConnectionAPIController,
  IDirectorySyncController,
  IOAuthController,
  JacksonOption,
} from '@boxyhq/saml-jackson';

let apiController: IConnectionAPIController;
let oauthController: IOAuthController;
let directorySync: IDirectorySyncController;

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
const g = global as any;

export default async function init(opts: JacksonOption) {
  if (!g.apiController || !g.oauthController || !g.directorySync) {
    const ret = await jackson(opts);

    apiController = ret.apiController;
    oauthController = ret.oauthController;
    directorySync = ret.directorySyncController;

    g.apiController = apiController;
    g.oauthController = oauthController;
    g.directorySync = directorySync;
  } else {
    apiController = g.apiController;
    oauthController = g.oauthController;
    directorySync = g.directorySync;
  }

  return {
    apiController,
    oauthController,
    directorySync,
  };
}
