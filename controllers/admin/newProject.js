const Project = require('../../models/project');


//get one product
const getProject = async(req, res) => {
    try{
        const {id} = req.params;
        const project = await Project.findById(id)
        res.status(200).json(project)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
}

//create product
const createProject = async(req, res) => {
    try{
        const project = await Project.create(req.body)
        res.status(200).json(project);
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
}

//update product
const updateProject = async(req, res) =>{
    try{
        const {id} = req.params;
        const project = await Project.findByIdAndUpdate(id, req.body)
        //we cannot find any product in database
        if(!project){
          return res.status(404).json({message:`cannot find any product with ID ${id}`})  
        }
        const updateProject = await Project.findById(id)
        res.status(200).json(updateProject)
    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
}


module.exports = {
    getProject,  updateProject, createProject
}