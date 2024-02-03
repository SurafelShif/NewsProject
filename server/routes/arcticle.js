const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middlewares/auth");
const {
  ArticleModel, // Corrected model name
  validateArticleModel,
} = require("../models/arcticlesModel");

router.get("/", async (req, res) => {
  res.json({ msg: "arcticle work!" });
});
router.post("/getObjectId",auth, async (req, res) => {
  try {
    const { userId, categories } = req.body;
    const {author,content}=categories[0].articles[0];
    const {name}=categories[0];
    // Construct a query to find the article based on the provided criteria
  
    // Use findOne to find the article that matches the query

    const foundArticle = await ArticleModel.aggregate([
      {
        $unwind: "$categories"
      },
      {
        $unwind: "$categories.articles"
      },
      {
        $match: {
          "categories.articles.author": author,
          "categories.articles.content": content
        }
      },
      {
        $project: {
          _id: 0,
          categories: 1
        }
      }
    ]);
    if (foundArticle) {
      return res.json({ objectId: foundArticle[0].categories.articles._id.toString(), msg: "Article found!" });
    } else {
      console.log("Article not found");
      return res.status(404).json({ msg: "Article not found" });
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.post("/isFound", auth,async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, categories } = req.body;
    // Fetch the existing document for the user
    const existingDocument = await ArticleModel.findOne({ userId: userId });

    // Update the document with the new categories and articles
    if (existingDocument) {
      // Check if any category in the existing document matches the incoming request
      const isFound = existingDocument.categories.some((existingCategory) => {
        return arraysAreEqual(existingCategory.articles, categories[0].articles[0]);
      });

      if (isFound) {
        return res.send(true);
      }
    }

    return res.send(false);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/add-articles",auth, async (req, res) => {
  try {
    // Validate the request body
    
    const { error } = validateArticleModel(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // Extract data from the request body
    const { userId, categories } = req.body;

    // Fetch the existing document for the user
    const existingDocument = await ArticleModel.findOne({ userId: userId });
    // Update the document with the new categories and articles
    if (existingDocument) {
      // Check if the entire categories array is already present
      if (
        arraysAreEqual(
          existingDocument.categories[0].articles,
          categories[0].articles[0]
        )
      ) {
        console.log("Articles are already present in the database");
        return res.send(false);
      }

      for (const newCategory of categories) {
        const existingCategoryIndex = existingDocument.categories.findIndex(
          (category) => category.name === newCategory.name
        );

        if (existingCategoryIndex !== -1) {
          // If the category already exists, append articles to its array
          existingDocument.categories[existingCategoryIndex].articles.push(
            ...newCategory.articles
          );
        } else {
          // If the category is new, add it to the categories array
          existingDocument.categories.push(newCategory);
        }
      }

      // Save the updated document
      await existingDocument.save();
      res.send("Articles updated successfully");
    } else {
      // If the document doesn't exist, create a new one
      await ArticleModel.create({ userId: userId, categories: categories });
      console.log("Articles added successfully");
      res.send("Articles added successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/:objectId",auth, async (req, res) => {
  try {
    const objectId = req.params.objectId; // Get objectId from route params


    // Use updateOne with $pull to remove the specific article
    const deletedObject = await ArticleModel.updateOne(
      {
        'categories.articles': { $elemMatch: { _id: objectId } }
      },
      {
        $pull: {
          'categories.$.articles': { _id: objectId }
        }
      }
    );


    if (deletedObject.modifiedCount > 0) {
      return res.status(200).send("Article deleted successfully");
    } else {
      console.log("Article not found");
      return res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/getArcticle/:category",auth, async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.tokenData._id;
    
    const articles = await ArticleModel.find(
      { userId },
      {
        categories: {
          $elemMatch: {
            name: category,
          },
        },
      }
    );
    

    // You can send the retrieved articles as a response
    res.json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Function to check if two arrays are equal
function arraysAreEqual(arr1, arr2) {

  for (let i = 0; i < arr1.length; i++) {
    
    if (
      arr1[i].author === arr2.author &&
      arr1[i].title === arr2.title &&
      arr1[i].description === arr2.description &&
      arr1[i].url === arr2.url &&
      arr1[i].content === arr2.content
    ) {
      return true;
    }
    
  }

  return false;
}
module.exports = router;
