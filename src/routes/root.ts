import { FastifyPluginAsync } from 'fastify'
import { translateHandler } from '../handlers/translate.js';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/translate', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          lang: { type: 'string', default: 'ar' }
        },
        required: ['text']
      }
    }
  }, translateHandler)

  fastify.get('/translate', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          lang: { type: 'string', default: 'ar' }
        },
        required: ['text']
      }
    }
  }, translateHandler)
}

export default root;
