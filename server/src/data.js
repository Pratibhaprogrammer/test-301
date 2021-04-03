'use strict';

const DataModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async(req,res,next) => {
  console.log('adding item');
  try {
    const data = req.body;
    const item = new DataModel(data);
    await item.save()
    res.status(200).json(item);
  } catch(e) { next(e.message); }
};

Data.getAllItems = async(req, res) => {
  try{
    console.log('getting item');
  const items = await DataModel.find({});
  res.status(200).json(items);
  } catch (err){
    console.error(err);
  }
};

Data.getOneItem = async(req, res) => {
  console.log('get one');
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).json(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).json('deleted');
console.log('deleting item');
}

Data.updateOneItem = async(req, res) => {
  console.log('updating item');
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
