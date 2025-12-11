import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemas'
import {PreviewAction} from './actions/PreviewAction'

export default defineConfig({
  name: 'default',
  title: 'Wevolv3 Blog',

  projectId: 'sszuldy6',
  dataset: 'production',

  // Configure base path for hosting at /studio
  basePath: '/studio',

  // Deployment configuration (for Sanity Hosting - optional)
  deployment: {
    appId: 'oz6fuqwi7pfb9q46syts438l',
    autoUpdates: true,
  },

  plugins: [
    structureTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
  
  // Configurar preview action customizada
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'post') {
        return [PreviewAction, ...prev]
      }
      return prev
    },
  },
})
