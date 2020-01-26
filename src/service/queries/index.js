const carQreryFragment = `
    id
    make
    model
    trim
    engineType
    physicalStatus
    legalStatus
    sellingStatus
    financialDetails{
      purchasePrice
      purchaseDate
      purchaseLocation
      paymentDonePercentage
      sellingPrice
      sellingDate
      sellingLocation
      sellingDonePercentage
      margin
    }
`
export const carDetailQuery = `
query($id:ID!){
  car(id:$id){
    id
    make
    model
    trim
    engineType
    physicalStatus
    legalStatus
    sellingStatus
    financialDetails{
      purchasePrice
      purchaseDate
      purchaseLocation
      paymentDonePercentage
      sellingPrice
      sellingDate
      sellingLocation
      sellingDonePercentage
      margin
    }
  }
}`;

export const carUpdateMutation = `
mutation($car:CarInput){
  updateCar(car:$car){
   id
    make
    model
    trim
    engineType
    physicalStatus
    legalStatus
    sellingStatus
    financialDetails{
      purchasePrice
      purchaseDate
      purchaseLocation
      paymentDonePercentage
      sellingPrice
      sellingDate
      sellingLocation
      sellingDonePercentage
      margin
    }
  }
}`;

export const makeQuery = `
query{
  make
}`;
export const modelQuery = `
query($make:String!){
  model(make: $make)
}`;


export const trimQuery = `
query(
$make:String!
$model:String!
){
  trim(make: $make, model: $model)
}`;


export const carTaskQuery = `
query($id:ID!){
  tasks(carId:$id){
    id
    taskType
    comment
    completed
  }
}`;

export const addTaskMutation = `
mutation(
$id:ID!
$type:TaskType!
$comment:String!
){
  createTask(
  carId:$id
  task:{
   taskType:$type
   comment:$comment
  }
  )
}`;

export const updateTaskMutation = `
mutation(
$id:ID!
$completed:Boolean!
){
  updateTask(
      id:$id
      completed:$completed
  ){
    id
    taskType
    comment
    completed
    }
}`;
