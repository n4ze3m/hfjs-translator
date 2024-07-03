import { FastifyPluginAsync } from 'fastify'
import { translateHandler } from '../handlers/translate.js';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/translate', translateHandler)
}

export default root;
