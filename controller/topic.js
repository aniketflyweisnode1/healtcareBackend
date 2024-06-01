import upload from "../middelware/uplod";
import Topic from "../model/topic";

export const addTopic = async (req, res) => {
  const uploadSingle = upload.single("images");

  uploadSingle(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err.message });
    }

    const { name, description, title } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const images = [
        {
          title,
          description,
          imageUrl,
        },
      ];

      const newTopic = new Topic({ name, images });
      await newTopic.save();
      res.status(201).json(newTopic);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating topic", error: error.message });
    }
  });
};

export const updateTopic = async (req, res) => {
  const { id } = req.body;
  console.log("Received topic ID:", id);

  try {
    console.log("Received topic ID:", id);
    const topic = await Topic.findById(id);
    console.log(topic, "topic");

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const { name, description, title } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl || null;

    topic.name = name || topic.name;

    if (imageUrl) {
      topic.images = [
        {
          title: title || topic.images[0].title,
          description: description || topic.images[0].description,
          imageUrl,
        },
      ];
    }

    await topic.save();

    res.status(200).json(topic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating topic", error: error.message });
  }
};

export const getAllTopicNames = async (req, res) => {
  try {
    const topics = await Topic.find({}, "name");
    const topicNames = topics.map((topic) => topic.name);
    res.status(200).json({ message: "All topic list", topicNames });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching topic names", error: error.message });
  }
};

export const getTopicDetails = async (req, res) => {
  const { name } = req.params;

  try {
    const topic = await Topic.findOne({ name });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json({ message: "detail of topic", topic });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching topic details", error: error.message });
  }
};


export const deleteTopic = async (req, res) => {
    const { id } = req.params;
  
    try {
      const topic = await Topic.findById(id);
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
  
      await topic.remove();
  
      res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting topic', error: error.message });
    }
  };
  