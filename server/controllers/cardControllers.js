const CardModel = require("../models/Cards");

module.exports.Card = async(req,res) => {
    try {
        const { title, description, status, priority, deadline } = req.body;
        const count = await CardModel.countDocuments({ status });
        const card = new CardModel({ title, description, status, priority, deadline,order: count });
        await card.save();
        res.status(201).json(card);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}


module.exports.getCards = async(req,res) => {
    try {
        // Fetch all cards and sort by status and order
        const cards = await CardModel.find().sort({ order: 1 });
        res.status(200).json(cards);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching cards', error });
      }
}

// module.exports.order = async(req,res) =>{
//   try {
//     const { source, destination, movedTask } = req.body;
//     console.log(req.body)
//     res.status(200).json({ message: 'Reorder', });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching cards', error });
//   }
// }


module.exports.order = async (req, res) => {
  try {
    const { source, destination, movedTask } = req.body;

    const statusMap = {
      "to-do": "To-Do",
      "in-progress": "In Progress",
      "under-review": "Under Review",
      "finished": "Finished",
    };

    console.log("Request body:", req.body);

    // Find tasks in the source column and update their orders
    const sourceTasks = await CardModel.find({ status: statusMap[source.droppableId] });
    console.log("Source tasks before update:", sourceTasks);

    await Promise.all(sourceTasks.map(async (task, index) => {
      if (index >= source.index && task._id.toString() !== movedTask._id) {
        task.order -= 1;
        await task.save();
      }
    }));

    // Find tasks in the destination column and update their orders
    const destinationTasks = await CardModel.find({ status: statusMap[destination.droppableId] });
    console.log("Destination tasks before update:", destinationTasks);

    await Promise.all(destinationTasks.map(async (task, index) => {
      if (index >= destination.index && task._id.toString() !== movedTask._id) {
        task.order += 1;
        await task.save();
      }
    }));

    // Update the moved task's status and order
    const updatedTask = await CardModel.findById(movedTask._id);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    updatedTask.status = statusMap[destination.droppableId];
    updatedTask.order = destination.index;
    await updatedTask.save();

    console.log("Updated task:", updatedTask);

    res.status(200).json({ message: 'Reorder successful' });
  } catch (error) {
    console.error("Error updating task order:", error);
    res.status(500).json({ message: 'Error updating task order', error });
  }
};