import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      verbose: true, // 是否在控制台中输出压缩结果
      ext: '.gz',
      deleteOriginFile: true // 源文件压缩后是否删除
    }),
    visualizer({
       // 打包完成后自动打开浏览器，显示产物体积报告
       open: true,
    })
  ],
  server: {
    open:true,
    proxy: {
      '^/api':{
        target:'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/api/, '')
      }
    }

  },
  resolve:{
    alias: {
      "@" : path.resolve(__dirname,'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',  // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js',  // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        experimentalMinChunkSize: 10 * 1024, // 单位b 没有副作用，合并较小的模块
        manualChunks (id) {
            if (id.includes('/echarts')) {
                // return 'echarts'
                return id.toString().split("/echarts")[1].split("/")[0].toString(); 
            }
            if (id.includes('/@vue')) {
                // return 'vue-use'
                return id.toString().split("/echarts")[1].split("/")[0].toString(); 
            }
            if (id.includes('/node_modules/')) {
                // return 'vendor'
                // 让每个插件都打包成独立的文件
                return id.toString().split("/node_modules/")[1].split("/")[0].toString(); 
            }
        }
      }
    }
  }
})
