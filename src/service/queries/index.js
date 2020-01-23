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

// updateCar(car: {
//     id:"20664c0d-266e-4950-a70d-c0a63afd510b"
//     legalStatus:null
// }){
//     id
//     physicalStatus
//     legalStatus
//     financialDetails{purchasePrice}
// }
// }

export const carUpdateMutation = `
mutation($car:CarInput){
  updateCar(car:$car){
    physicalStatus
    legalStatus
    sellingStatus
  }
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
