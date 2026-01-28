const Course = require('../../models/CourseModel');

// CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, provider, media, quizzes } = req.body;

    if (!title || !category || !provider)
      return res.status(400).json({ message: 'Title, category and provider are required' });

    const course = new Course({ title, description, category, provider, media, quizzes });
    await course.save();
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL COURSES
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('category', 'name')
      .populate('provider', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    Object.assign(course, req.body); // updates title, description, media, quizzes etc.
    await course.save();
    res.json({ message: 'Course updated', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await Course.deleteOne({ _id: course._id });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
