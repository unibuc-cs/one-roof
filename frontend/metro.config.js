const { getDefaultConfig } = require('@expo/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');

// Add blacklist to exclude certain directories (e.g., node_modules)
defaultConfig.resolver.blacklistRE = blacklist([
    /node_modules\/.*node_modules\/.*/, // Exclude nested node_modules
]);

module.exports = defaultConfig;
