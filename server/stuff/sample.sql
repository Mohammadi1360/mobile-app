User.hasMany(Task); // Will add userId to Task model
Task.belongsTo(User); // Will also add userId to Task model


User.belongsTo(Company, {foreignKey: 'fk_company'}); // Adds fk_company to User

// One-way associations
Project.hasOne(User)

Project.hasOne(User, { as: 'Initiator' })
// Now you will get Project.getInitiator and Project.setInitiator

Person.hasOne(Person, {as: 'Father'})
// this will add the attribute FatherId to Person

Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})
// this will add the attribute DadId to Person

// In both cases you will be able to do:
Person.setFather
Person.getFather

// Adds companyName attribute to User
// Use name attribute from Company as source attribute
Company.hasOne(User, {foreignKey: 'companyName', sourceKey: 'name'});

Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })
// This will create the table PersonChildren which stores the ids of the objects.

User.belongsToMany(Project, { as: { singular: 'task', plural: 'tasks' }})
// Notice that inflection has no problem singularizing tasks, this is just for illustrative purposes.

This will add the functions add/set/get Tasks to user instances.

Project.hasMany(Task)
Task.belongsTo(Project)

Project.create()...
Task.create()...
Task.create()...

// save them... and then:
project.setTasks([task1, task2]).then(() => {
  // saved!
})

// ok, now they are saved... how do I get them later on?
project.getTasks().then(associatedTasks => {
  // associatedTasks is an array of tasks
})

// You can also pass filters to the getter method.
// They are equal to the options you can pass to a usual finder method.
project.getTasks({ where: 'id > 10' }).then(tasks => {
  // tasks with an id greater than 10 :)
})

// You can also only retrieve certain fields of a associated object.
project.getTasks({attributes: ['title']}).then(tasks => {
  // retrieve tasks with the attributes "title" and "id"
})

// remove the association with task1
project.setTasks([task2]).then(associatedTasks => {
  // you will get task2 only
})

// remove 'em all
project.setTasks([]).then(associatedTasks => {
  // you will get an empty array
})

// or remove 'em more directly
project.removeTask(task1).then(() => {
  // it's gone
})

// and add 'em again
project.addTask(task1).then(() => {
  // it's back again
})







Document.hasMany(Version);
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId',
  constraints: false
});
