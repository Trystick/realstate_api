import Post from "../models/Post.js";
import PostCategory from "../models/PostCategory.js";


export const createPost = async (req, res, next) => {
    const postCategoryId = req.params.postcategoryid;

    // Kiểm tra xem PostCategory có tồn tại không
    const postCategoryExists = await PostCategory.findById(postCategoryId);
    if (!postCategoryExists) {
        return res.status(400).send("PostCategory không tồn tại!");
    }

    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save()
        try {
            await PostCategory.findByIdAndUpdate(postCategoryId, 
                {$push : {posts: savedPost._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedPost);
    } catch (err) {
        next(err);
    }
};


export const updatePost = async(req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedPost)
    } catch (err) {
        next(err);
    }
}

export const deletePost = async(req, res, next) => {
    const postCategoryId = req.params.postcategoryid;
    try {
        await Post.findByIdAndDelete(
            req.params.id
        );
        try {
            await PostCategory.findByIdAndUpdate(postCategoryId, 
                {$pull : {posts: req.params.id}
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Post has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getPost = async(req, res, next) => {
    try {
        const post =  await Post.findById(
            req.params.id
        );
        res.status(200).json(post)
    } catch (err) {
        next(err);
    }
}

export const getPosts = async (req, res, next) => {
  try {
    const posts =  await Post.find();
    res.status(200).json(posts)
  } catch (err) {
      next(err);
  }
}

export const getPostsByCategory = async (req, res, next) => {
    try {
      const posts = await Post.find({ postCategoryId: req.params.id });
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
};

export const getRandomPosts = async (req, res, next) => {
    try {
      const posts = await Post.aggregate([{ $sample: { size: 3 } }]);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
};
  

// export const getProjectsSix = async (req, res, next) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 6;
//       const skip = (page - 1) * limit;
//       const total = await Project.countDocuments();
//       const projects = await Project.find().skip(skip).limit(limit);
//       res.status(200).json({ projects, page, limit, total });
//     } catch (err) {
//       next(err);
//     }
// }



// export const getProjectsThree = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 3;
//     const skip = (page - 1) * limit;
//     const total = await Project.countDocuments();
//     const projects = await Project.find().skip(skip).limit(limit);
//     res.status(200).json({ projects, page, limit, total });
//   } catch (err) {
//     next(err);
//   }
// }
  


