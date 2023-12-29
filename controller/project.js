import Category from "../models/Category.js";
import Project from "../models/Project.js";


export const createProject = async (req, res, next) => {
  const categoryId = req.params.categoryid;

  // Kiểm tra xem Category có tồn tại không
  const categoryExists = await Category.findById(categoryId);
  if (!categoryExists) {
      return res.status(400).send("Category không tồn tại!");
  }

  const newProject = new Project(req.body);

  try {
      const savedProject = await newProject.save()
      try {
          await Category.findByIdAndUpdate(categoryId, 
              {$push : {projects: savedProject._id},
          });
      } catch (err) {
          next(err);
      }
      res.status(200).json(savedProject);
  } catch (err) {
      next(err);
  }
};

export const updateProject = async(req, res, next) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedProject)
    } catch (err) {
        next(err);
    }
}

export const deleteProject = async(req, res, next) => {
    const categoryId = req.params.categoryid;
    try {
        await Project.findByIdAndDelete(
            req.params.id
        );
        try {
            await Category.findByIdAndUpdate(categoryId, 
                {$pull : {projects: req.params.id}
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Project has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getProject = async(req, res, next) => {
    try {
        const project =  await Project.findById(
            req.params.id
        );
        res.status(200).json(project)
    } catch (err) {
        next(err);
    }
}

export const getProjectNear = async (req, res, next) => {
  try {
      const name = req.query.name ? req.query.name.toString() : '';
      const projects = await Project.find({
          name: { $regex: name, $options: 'i' }
      }).limit(3);
      res.status(200).json(projects);
  } catch (err) {
      next(err);
  }
}

export const getProjects = async (req, res, next) => {
  try {
    const projects =  await Project.find();
    res.status(200).json(projects)
  } catch (err) {
      next(err);
  }
}

export const getProjectsSix = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * limit;
      const total = await Project.countDocuments();
      const projects = await Project.find().skip(skip).limit(limit);
      res.status(200).json({ projects, page, limit, total });
    } catch (err) {
      next(err);
    }
}



export const getProjectsThree = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const total = await Project.countDocuments();
    const projects = await Project.find().skip(skip).limit(limit);
    res.status(200).json({ projects, page, limit, total });
  } catch (err) {
    next(err);
  }
}
  
export const getProjectByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const project = await Project.findOne({ name: name });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Không tìm thấy dự án với tên này" });
    }
  } catch (err) {
    next(err);
  }
}

export const getProjectByNameOrLocation = async (req, res, next) => {
    try {
      const name = req.query.name;
      const locationTitle = req.query.locationTitle;
      const project = await Project.findOne({ $or: [{ name: name }, { location: locationTitle }] }).limit(3);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Không tìm thấy dự án với tên hoặc vị trí này" });
      }
    } catch (err) {
      next(err);
    }
  }

export const getRandomProjects = async (req, res, next) => {
    try {
      const projects = await Project.aggregate([{ $sample: { size: 3 } }]);
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
};

  