const mongoose = require("mongoose");
const Joi = require("joi");

const ArticleSchema = new mongoose.Schema({
  categories: [
    {
      name: { type: String, required: true },
      articles: [
        {
          source: {
            id: { type: String, default: null },
            name: { type: String, required: true },
          },
          author: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          url: { type: String, required: true },
          urlToImage: { type: String },
          publishedAt: { type: Date, required: true },
          content: { type: String },
        }
      ],
    }
  ],
  userId: { type: String, required: true },
}, { timestamps: true });

exports.ArticleModel = mongoose.model("Article", ArticleSchema);

exports.validateArticleModel = (_reqBody) => {
  const joiSchema = Joi.object({
    categories: Joi.array().items(
      Joi.object({
        name: Joi.string().min(1).max(100).required(),
        articles: Joi.array().items(
          Joi.object({
            source: Joi.object({
              id: Joi.string().allow(null),
              name: Joi.string().required(),
            }).required(),
            author: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            url: Joi.string().uri().required(),
            urlToImage: Joi.string().uri(),
            publishedAt: Joi.date().required(),
            content: Joi.string(),
          })
        ).required(),
      })
    ).min(1).max(99).required(),
    userId: Joi.string().min(1).max(1000).required(),
  });

  return joiSchema.validate(_reqBody);
};
