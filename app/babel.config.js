module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      // Optional: Add this if you're using Reanimated
      'react-native-reanimated/plugin',
    ],
  };
};