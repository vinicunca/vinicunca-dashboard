import { isObject, isString } from '@vinicunca/js-utilities';

/**
 * Read all environment variable configuration files to process.env
 */
export function getEnvVars(envConfig: Record<string, any>): ViteEnv {
  const _env = {} as ViteEnv;

  for (const _name of Object.keys(envConfig)) {
    let realName = envConfig[_name].replace(/\\n/g, '\n');

    if (realName === 'true') {
      realName = true;
    } else if (realName === 'false') {
      realName = false;
    } else if (_name === 'VITE_PORT') {
      realName = Number(realName);
    } else if (_name === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }

    _env[_name] = realName;

    if (isString(realName)) {
      process.env[_name] = realName;
    } else if (isObject(realName)) {
      process.env[_name] = JSON.stringify(realName);
    }
  }

  return _env;
}
