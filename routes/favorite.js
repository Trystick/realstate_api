import express from "express";
import { addFavorite, checkFavorite, getFavorite, getFavorites, removeFavorite } from "../controller/favorite.js";

const router = express.Router();

router.post('/', addFavorite);
router.delete('/favorites', removeFavorite);
router.get('/', getFavorites);
router.get('/:id', getFavorite);
router.get('/checkfavorite/:check', checkFavorite);

export default router