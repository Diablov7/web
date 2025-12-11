import {definePlugin} from 'sanity'

export const autoUpdatePublishedDate = definePlugin({
  name: 'auto-update-published-date',
  document: {
    actions: (prev, context) => {
      // Interceptar ações de publish e unpublish
      return prev.map((originalAction) => {
        if (originalAction.action === 'publish' || originalAction.action === 'unpublish') {
          return {
            ...originalAction,
            onHandle: async () => {
              // Atualizar publishedAt para data atual antes de publicar
              const {schemaType, idPair} = context
              if (schemaType === 'post') {
                const client = context.getClient({apiVersion: '2024-01-01'})
                await client
                  .patch(idPair.publishedId || idPair.draftId)
                  .set({
                    publishedAt: new Date().toISOString(),
                  })
                  .commit()
              }
              // Executar ação original
              return originalAction.onHandle()
            },
          }
        }
        return originalAction
      })
    },
  },
})

