import type { FastifyRequest, FastifyReply } from "fastify";

type TranslateRequest = {
  Querystring: {
    text: string;
    lang?: string;
  };
};

export const translateHandler = async (
  request: FastifyRequest<TranslateRequest>,
  reply: FastifyReply
) => {
  try {
    const text = request.query.text;
    const lang = request.query.lang || "ar";

    if (lang === "ar") {
      const translated_text = await request.server.arabic_pipline(text);

      if (Array.isArray(translated_text)) {
        if (translated_text.length > 0) {
          //@ts-ignore
          let text = translated_text[0]?.translation_text || "";
          text = text.trim();
          text = text.endsWith(".") ? text.slice(0, -1) : text;
          text = text.startWith(".") ? text.slice(1) : text;
          return {
            //@ts-ignore
            translated_text: text,
          };
        }
      }

      return {
        //@ts-ignore
        translated_text: translated_text?.translation_text,
      };
    } else {
      if (!request.server.english_pipeline) {
        return {
          translated_text: "English pipeline not added to the server",
        };
      }

      const translated_text = await request.server.english_pipeline(text);

      if (Array.isArray(translated_text)) {
        if (translated_text.length > 0) {
          //@ts-ignore
          let text = translated_text[0]?.translation_text || "";
          text = text.trim();
          text = text.endsWith(".") ? text.slice(0, -1) : text;
          text = text.startWith(".") ? text.slice(1) : text;
          return {
            //@ts-ignore
            translated_text: text,
          };
        }
      }

      return {
        //@ts-ignore
        translated_text: translated_text?.translation_text,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      translated_text: "",
    };
  }
};
