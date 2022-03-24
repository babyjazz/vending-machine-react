const CracoAntDesignPlugin = require('craco-antd')
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')

module.exports = {
  eslint: {
    mode: 'file',
  },
  plugins: [
    {
      plugin: reactHotReloadPlugin,
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: './src/theme.less',
      },
    },
  ],
}
