import asyncHandler from "express-async-handler" 

import Service from '../models/serviceModel.js'

// @ desc Get services
// @route GET/api/services
// @acess Private

const getServices = asyncHandler( async (req,res) =>{
    const services = await Service.find()
    res.status(200).json(services)
})

// @ desc Get services by id
// @route GET/api/services/:id
// @acess Private

const getServicesById = asyncHandler( async (req,res) =>{
   const {id} = req.params
   const services = await Service.findById(id)
   if(!services){
      res.status(400)
      throw new Error('Service not found')
  }else{
   res.status(200).json(services)
}
})


// @ desc Set services
// @route POST/api/services
// @acess Private

const setService = asyncHandler( async (req,res) =>{
    const {title , description} = req.body

    if(!title || !description){
       res.status(400)
       throw new Error('Please add a text field')
    }else{
    const service = await Service.create({
       title:title,
       description:description
    })


   res.status(200).json(service)}
})


// @ desc Update service
// @route PUT/api/services/:id
// @acess Private

const updateService = asyncHandler(async (req,res) =>{ 

   const {title , description} = req.body
   const {id} = req.params
   const service = await Service.findById(id)
   
   if(!service){
       res.status(400)
       throw new Error('Service not found')
   }
   
   const updatedService = await Service.findByIdAndUpdate(id, {title:title,description:description},
      {
          new:true,
  })
       res.status(200).json(updatedService) 
   })


// @ desc Delete services
// @route Delete/api/services/:id
// @acess Private

const deleteService = asyncHandler(async (req,res) =>{
   const service = await Service.findById(req.params.id)

if(!service){
   res.status(400)
   throw new Error('Service not found')
}

await service.remove()

   res.status(200).json({id:req.params.id})
})


export { getServices, setService, updateService, deleteService,getServicesById }