const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        entry: {
            app: './src/main.js',
            style: [
                'bootstrap/dist/css/bootstrap.min.css'
            ]
        }
    }
})
