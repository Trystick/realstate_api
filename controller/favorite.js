import Favorite from "../models/Favorite.js";
import User from "../models/User.js";


export const addFavorite = async (req, res) => {
  const favorite = new Favorite({
    userId: req.body.userId,
    landsaleId: req.body.landsaleId,
    landleaseId: req.body.landleaseId,
  });

  try {
    await favorite.save();

    const user = await User.findById(req.body.userId);
    user.favorites.push(favorite);
    await user.save();

    res.status(201).send(favorite);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      userId: req.body.userId,
      landsaleId: req.body.landsaleId,
      landleaseId: req.body.landleaseId,
    });

    if (!favorite) {
      return res.status(404).send();
    }

    const user = await User.findById(req.body.userId);
    user.favorites.pull(favorite);
    await user.save();

    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites)
  } catch (err) {
    next(err);
  }
};


export const getFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ _id: req.params.id });
    if (!favorite) {
      return res.status(404).send();
    }
    res.send(favorite);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const { userId, landsaleId, landleaseId} = req.query;

    if (!userId || (!landsaleId && !landleaseId)) {
      return res.status(400).send({ error: 'Yêu cầu không hợp lệ. Vui lòng cung cấp userId và ít nhất một trong ba tham số: landsaleId, landleaseId'});
    }

    const query = { userId };

    if (landsaleId) query.landsaleId = landsaleId;
    else if (landleaseId) query.landleaseId = landleaseId;


    const favorite = await Favorite.findOne(query);

    if (!favorite) {
      return res.send({ isFavorited: false });
    }

    res.send({ isFavorited: true });
  } catch (error) {
    res.status(500).send(error);
  }
};


