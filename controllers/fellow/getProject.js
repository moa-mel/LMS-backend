const { MongoClient } = require('mongodb');
const uri = process.env.DB_CONNECT;
const client = new MongoClient(uri);

const getProjectsByStatus = (statusArray) => {
    return async (req, res) => {
        try {
            if (!client.connect()) {
                await client.connect();
            }

            const database = client.db('test');
            const projectsCollection = database.collection('fellows');

            const pipeline = [
                {
                    $match: {
                        status: { $in: statusArray }
                    }
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "tasks",
                        foreignField: "_id",
                        as: "taskDetails"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "assignedTo",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$taskDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        status: { $first: "$status" },
                        assignedTo: { $first: "$assignedTo" },
                        userDetails: { $first: "$userDetails" },
                        tasks: { $push: "$taskDetails" }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        projectName: "$name",
                        projectStatus: "$status",
                        userName: { $arrayElemAt: ["$userDetails.name", 0] },
                        tasks: {
                            $map: {
                                input: "$tasks",
                                as: "task",
                                in: {
                                    taskName: "$$task.name",
                                    taskStatus: "$$task.status"
                                }
                            }
                        }
                    }
                }
            ];

            const projects = await projectsCollection.aggregate(pipeline).toArray();
            res.status(200).json(projects);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
};

module.exports = {
    getAssignedProjects: getProjectsByStatus(["assigned"]),
    getCompletedProjects: getProjectsByStatus(["completed"]),
    getInProgressProjects: getProjectsByStatus(["in progress"]),
    getAvailableProjects: getProjectsByStatus(["available"]),
};
