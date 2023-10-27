const express = require("express");
const app = express();
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Translation = require("../models/translation");

const supportedLanguages = ["en", "es", "fr"];
const validateLanguage = (req, res, next) => {
  const { sourceLanguage, targetLanguage } = req.body;
  if (!supportedLanguages.includes(sourceLanguage)) {
    return res
      .status(400)
      .json({ message: `Source language not supported: ${sourceLanguage}` });
  }
  if (!supportedLanguages.includes(targetLanguage)) {
    return res
      .status(400)
      .json({ message: `Target language not supported: ${targetLanguage}` });
  }
  next();
};

router.get(
  "/:word:targetLanguage",
  asyncHandler(async (req, res) => {
    const { word, targetLanguage } = req.params;
    const translation = await Translation.findOne({
      Originaltext: word,
      targetLanguage: targetLanguage,
    });
    if (translation) {
      res.json(translation);
    } else {
      res.status(404);
      throw new Error("Translation not found");
    }
  })
);

router.post(
  "/,validateLanguage",
  asyncHandler(async (req, res) => {
    const { Originaltext, Translatedtext, sourceLanguage, targetLanguage } =
      req.body;
    const newTranslation = new Translation({
      Originaltext,
      Translatedtext,
      sourceLanguage,
      targetLanguage,
    });
    const createdTranslation = await newTranslation.save();
    res.status(201).json(createdTranslation);
  })
);
router.put(
  "/:id,validateLanguage",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { Translatedtext, targetLanguage } = req.body;

    const translation = await Translation.findById(id);
    if (!translation) {
      return res.status(404).json({ message: "Translation not found" });
    }

    translation.Translatedtext = Translatedtext || translation.Translatedtext;
    translation.targetLanguage = targetLanguage || translation.targetLanguage;

    const updatedTranslation = await translation.save();
    res.json(updatedTranslation);
  })
);

router.delete(
  "/translations/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const translation = await Translation.findById(id);
    if (!translation) {
      return res.status(404).json({ message: "Translation not found" });
    }

    await translation.remove();
    res.json({ message: "Translation deleted" });
  })
);

module.exports = router;
