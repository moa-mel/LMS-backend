const { MongoClient } = require('mongodb');

const uri = process.env.DB_CONNECT;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let isClientConnected = false; // Variable to track connection status

const connectToDatabase = async () => {
    if (!isClientConnected) {
        await client.connect();
        isClientConnected = true; // Set to true once connected
    }
};

const notification = async (req, res) => {
    try {
        await connectToDatabase(); // Connect only if not connected

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

// Call client.close() on application shutdown to gracefully close the connection
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});

module.exports = notification;
