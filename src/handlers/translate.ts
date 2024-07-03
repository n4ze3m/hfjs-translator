import type { FastifyRequest, FastifyReply } from "fastify";

type TranslateRequest = {
  Querystring: {
    text: string;
  };
};

export const translateHandler = async (
  request: FastifyRequest<TranslateRequest>,
  reply: FastifyReply
) => {
  try {
    const text = request.query.text;

    const translated_text = await request.server.pipeline(text);

    if (Array.isArray(translated_text)) {
      if (translated_text.length > 0) {
        return {
          //@ts-ignore
          translated_text: translated_text[0]?.translation_text,
        };
      }
    }

    return {
      //@ts-ignore
      translated_text: translated_text?.translation_text,
    };
  } catch (e) {
    console.error(e);
    return {
      translated_text: "",
    };
  }
};
