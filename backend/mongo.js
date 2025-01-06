const mongoose = require('mongoose')
const Person = require('./models/person');

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://osa3:${password}@phonebook.4my4p.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 3) {
    Person.find({}).then((d, e) => {
        if (e) {
            console.log(e);
            mongoose.connection.close();
            return;
        }
        console.log(d);
        mongoose.connection.close();
    });
}
else if (process.argv.length >= 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then((d, e) => {
        if (e) {
            console.log(e);
            mongoose.connection.close();
            return;
        }
        console.log("Person added");
        mongoose.connection.close();
    });
}

