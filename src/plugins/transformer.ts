import { env, pipeline, TranslationPipeline } from "@xenova/transformers";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    arabic_pipline: TranslationPipeline;
    english_pipeline?: TranslationPipeline;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  env.allowLocalModels = true;
  env.localModelPath = process.env.LOCAL_MODEL_PATH!;
  env.allowRemoteModels = false;
  const translator = await pipeline("translation", process.env.MODEL_NAME!);
  if (process.env.MODEL_NAME_EN) {
    server.decorate("english_pipeline", await pipeline("translation", process.env.MODEL_NAME_EN));
  }
  server.decorate("arabic_pipline", translator);
});

export default prismaPlugin;
