const { MongoClient } = require('mongodb');

const uri = process.env.DB_CONNECT;
const client = new MongoClient(uri);

const notification = async (req, res) => {
    try {
        if (!client.isConnected()) {
            await client.connect();
        }

        const database = client.db('test');
        const projectsCollection = database.collection('fellows');

        const pipeline = [
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ];

        const projectCounts = await projectsCollection.aggregate(pipeline).toArray();
        
        let availableCount = 0, assignedCount = 0, inProgressCount = 0;
        projectCounts.forEach((item) => {
            if (item._id === "available") {
                availableCount = item.count;
            } else if (item._id === "assigned") {
                assignedCount = item.count;
            } else if (item._id === "in progress") {
                inProgressCount = item.count;
            }
        });

        res.status(200).json({
            availableProjects: availableCount,
            assignedProjects: assignedCount,
            inProgressProjects: inProgressCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = notification;