# Vue
### Подключение  
`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`

### CLI  
Позволяет создавать готовую сборку налету.
`npm install -g @vue/cli`

Создать проект.
`vue create hello-world`  
Или через графический интерфейс в браузере
`vue ui`  

Предложит выбрать, что включить в сборку:
1. babel, eslint;
2. default // предложит на выбор

Пресет настроек для Vue CLI — JSON-объект, который содержит предустановленные опции и плагины для создания нового проекта. Пресеты сохраняются в файле `~/.vuerc`.
Эти дополнительные конфигурации будут объединены в package.json.
Есть стандартные пресеты, но можно использовать и свои из репозитория git-hub. Репозиторий должен содержать:
1. `preset.json`: основной файл, содержащий настройки пресета (обязателен).
2. `generator.js`: генератор, который внедряет или модифицирует файлы в проекте.
3. `prompts.js`: файл подсказок, который может собирать настройки для генератора.

Теперь при создании проекта можно указать опцию --preset:
`vue create --preset username/repo my-project`
Или из локального файла:
`vue create --preset ./my-preset my-project`

### HTML

### Webpack
Сам webpack.config при создании проекта уже интегрирован в vue, поэтому его не будет видно. Его можно открыть с помощью команды:
`vue inspect` // в командную строку
`vue inspect > webpack.js` // в файл webpack.js
Самый простой способ изменить конфиг webpack это использовать объект `configureWebpack` в файле `vue.config.js`:
```
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
*Но вместо output.path нужно использовать опцию outputDir, а вместо output.publicPath нужно использовать опцию publicPath.*

Дабавление новых загрузчиков:
```
module.exports = {
  chainWebpack: config => {
    // Загрузчик GraphQL
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      // Добавление ещё одного загрузчика
      .use('other-loader')
        .loader('other-loader')
        .end()
  }
}
```

Для замены существующего загрузчика нужно найти старый по его названию правила (rule) среди уже существующих базовых, они расположены [здесь](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/base.js "Необязательная подсказка") а затем вызвать функцию удаления.
```
chainWebpack: config => {
  const imgRule = config.module.rule('images')
  imgRule.uses.clear() // очистили старый
  imgRule
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
        // publicPath: 'assets',
      })
      .end()
},
```

Для изменения вложенных правил
Also ran into this. My workaround is as follows:

Delete 'normal' oneOf rule
Insert my custom rule
Insert old 'normal' rule
```
    const normalRule = config.module.rule('css').oneOfs.store.get('normal')
    config.module.rule('css').oneOfs.store.delete('normal')
    config.module.rule('css')
      .oneOf('useable')
        .test(/\.useable\.css$/)
        .use('style-loader/useable')
          .loader('style-loader/useable')
          .options({ sourceMap: false,
                     shadowMode: false })
          .end()
        .use('css-loader')
          .loader('css-loader')
          .options({ sourceMap: false,
                     importLoaders: 2 })
          .end()
        .use('postcss-loader')
          .loader('postcss-loader')
          .options({ sourceMap: false })
          .end()
    config.module.rule('css').oneOfs.store.set('normal', normalRule)
```

Изменение настроек плагина
Для webpack есть специальный плагин [webpack-chain](https://github.com/neutrinojs/webpack-chain#getting-started), который позволяет настраивать различные сборки webpack
налету. Также он содержит специальные методы прохода. Его использует vue cli.
Например, изменим параметр templates плагина html:
```
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = '/Users/test/proj/app/templates/index.html'
        return args
      })
  }
}
```
В случае, если нам не нужны данные из объекта конфигурации config, например, подключаешь новый плагин. В этом случает посмотреть, используется-ли этот плагин в конфиге и если да то его нужно вначале удалить:  
```
chainWebpack: config => {
  config.plugins.delete('copy')
}
configureWebpack: {
  plugins: [
    new CopyPlugin([{
      from:  path.resolve(__dirname, 'src/assets/img'),
      to: path.resolve(__dirname, 'dist/img'),
      toType: 'dir'
    }])
  ]
}
```

### Переменные окружения
Переменные окружения можно указать в файле .env, который может быть:
1. .env  # загружается во всех случаях
2. .env.local # загружается во всех случаях, игнорируется git
3. .env.[mode] # загружается только в указанном режиме работы
4. .env.[mode].local # загружается только в указанном режиме работы, игнорируется git

Только переменные с префиксом VUE_APP_ будут статически внедряться в клиентскую сборку с помощью webpack.DefinePlugin
Например, .env.production:
```
VUE_APP_TITLE=My App
```
Теперь можно использовать так:
`console.log(process.env.VUE_APP_TITLE)`
Также всегда доступны` NODE_ENV`, `BASE_URL` (базовый путь).


### Публикация на gitPages


