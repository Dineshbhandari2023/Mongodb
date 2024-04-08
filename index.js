const mongoose = require('mongoose');

// Connecting Mongodb
mongoose.connect('mongodb://localhost/practice')
    .then(() => console.log('Connected to Mongodb!!'))
    .catch( err => console.error('Couldnot connect to your server!!', err))

// Defining schema for mongoose
const courseSchema = new mongoose.Schema({
    name: String,
    Address: String,
    Age: Number,
    Date: {type: Date, default: Date.now}
});

// Creating course class
const Course = mongoose.model('Course', courseSchema);

// Saving DB using async function Course known as Document in Mongodb.
async function createDb() {
    const course = new Course({
        name: 'Sushant',
        Address: 'Itahari-2',
        Age: 20
    });
    
    const result = await course.save();
    console.log(result);    
};


//  TO get db we can use filters like:
// eq, ne, gt, gte, lt, lte, in, nin :Comparision operators
// Logical Operators; or, and
async function getCourses() {
    const courses = await Course
        .find()
        // .find( {Age: {$gt: 21}} )//gt=Greater than
        .limit(20)//limiting query
        .or([ {name: 'Dinesh'} , {Age: {$gt: 21} }])
        .sort({name: 1,Age: 1}) //sorting the query
        .select({name: 1})//quantity selection
    console.log(courses);
}
getCourses();
