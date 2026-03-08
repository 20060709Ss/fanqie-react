import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),VitePWA({
    registerType:'autoUpdate',
    manifest:{
      name:'我的专业番茄钟',
      short_name:'番茄钟',
      description:'专注每一刻的效率工具',
      theme_color:'#ef4444',
      icons:[
        {
          src:'pomodoro.png',
          sizes:'192*192',
          type:'image/png'
        },
        {
          src:'pomodoro.png',
          sizes:'512*512',
          type:'image/png'
        }
      ]

    }
  })]
})
