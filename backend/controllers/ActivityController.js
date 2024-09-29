const Activity = require('../models/Activity');
const Advertiser = require('../models/Advertiser');
const ActivityCategory = require('../models/activityCategory');
const PreferenceTag = require('../models/PreferenceTag');

const createActivity = async (req, res) => {
  const { advertiser, title, description, date, time, location, priceRange, category: categoryName, tags: tagNames, specialDiscounts, isBookingOpen } = req.body;
  try {
    const existingAdvertiser = await Advertiser.findOne({ userName: advertiser });
    if (!existingAdvertiser) {
      return res.status(404).json({ error: "Advertiser not found" });
    }
    const category = await ActivityCategory.findOne({ Name: categoryName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const tags = await PreferenceTag.find({ Name: { $in: tagNames } });
    if (!tags || tags.length === 0) {
      return res.status(404).json({ error: "Tags not found" });
    }
 
    const newActivity = new Activity({
      advertiser: existingAdvertiser.userName,  
      title,
      description,
      date,
      time,
      location,
      priceRange,
      category: category._id,  // Use the ObjectId of the category
      tags: tags.map(tag => tag._id),  // Use ObjectIds for tags
      specialDiscounts,
      isBookingOpen
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error saving activity:", error);
    res.status(500).json({ error: "Failed to save activity" });
  }
};

const getActivities = async (req, res) => {
  try {
    const { username } = req.params; 
    const activities = await Activity.find({ advertiser: username });
    if (activities.length === 0) {
      return res.status(404).json({ error: "No activities found for this advertiser" });
    }
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateActivity = async (req, res) => {
  const { title, description, date, time, location, priceRange, category, tags, specialDiscounts, isBookingOpen } = req.body;

  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    //validate and update category if provided
    if (category) {
      const existingCategory = await ActivityCategory.findOne({ Name: category });
      if (existingCategory) {
        activity.category = existingCategory._id; // Store the ObjectId of the category
      } else {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    // If tags are provided, validate and update
    if (tags && Array.isArray(tags)) {
      const tagNames = tags; // Assuming tags are sent as an array of names
      const existingTags = await PreferenceTag.find({ Name: { $in: tagNames } });
      if (existingTags.length > 0) {
        activity.tags = existingTags.map(tag => tag._id); // Store the ObjectIds of the tags
      } else {
        return res.status(404).json({ error: 'Tags not found' });
      }
    }
    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.date = date || activity.date;
    activity.time = time || activity.time;
    activity.location = location || activity.location;
    activity.priceRange = priceRange || activity.priceRange;
    activity.specialDiscounts = specialDiscounts || activity.specialDiscounts;
    activity.isBookingOpen = isBookingOpen !== undefined ? isBookingOpen : activity.isBookingOpen;
    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) 
        return res.status(404).json({ error: 'Activity not found' });
    res.status(200).json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports={
    createActivity,
    getActivities,
    updateActivity,
    deleteActivity
}