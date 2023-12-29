import Like from "../models/Like.js";
import User from "../models/User.js";

export const createLike = async (req, res) => {
    const { userId, postId } = req.body;
  
    try {
      const like = new Like({ userId, postId });
      await like.save();
  
      const user = await User.findById(userId);
      user.likes.push(like._id);
      await user.save();
  
      res.status(200).json({ message: 'Like created successfully', like: like._id});
    } catch (error) {
      res.status(500).json({ message: 'Error creating like', error });
    }
};

export const getLike = async (req, res) => {
    const { likeId } = req.params;
  
    try {
      const like = await Like.findById(likeId);
      res.status(200).json({ like });
    } catch (error) {
      res.status(500).json({ message: 'Error getting like', error });
    }
};

export const getLikes = async (req, res) => {
  try {
      const likes = await Like.find();
      res.send(likes);
  } catch (error) {
      res.status(500).json({ message: 'Error getting all likes', error });
  }
};



export const updateLike = async (req, res) => {
    try {
        const like = await Like.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(like);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteLike = async (req, res) => {
    const { likeId } = req.params;
  
    try {
      const like = await Like.findById(likeId);
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
      await Like.deleteOne({ _id: likeId });
  
      const user = await User.findById(like.userId);
      user.likes.pull(like._id);
      await user.save();
  
      res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error deleting like', error });
    }
};


export const checkUserLike = async (req, res) => {
    const { userId, postId } = req.params;
  
    try {
      const like = await Like.findOne({ userId, postId });
      const hasLiked = !!like;
      res.status(200).json({ hasLiked });
    } catch (error) {
      res.status(500).json({ message: 'Error checking user like', error });
    }
  };
  