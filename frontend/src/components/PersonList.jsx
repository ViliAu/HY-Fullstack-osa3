import Person from "./Person";
import personService from '../services/persons';

const PersonList = ({persons, filter, setPersons, showMessage}) => {

    const deletePerson = async (id) => {
        const person = persons.filter(p => p.id === id)[0];
        if (window.confirm(`delete ${person.name}?`)) {
            personService.deletePerson(id);
            try {
                setPersons(persons.filter(p => p.id !== id))
                showMessage(false, `Deleted ${person.name}`);
            }
            catch(e) {
                showMessage(true, `Delete operation failed!`);
                setPersons(await personService.getAll());
            }
        }
    }

    const filtered = persons.filter(p => {
        if (p) {
            return p.name.toLowerCase().includes(filter.toLowerCase());
        }
    });
    const personEles = filtered.map(p => {
        if (p) {
            return <Person person={p} deletePerson={deletePerson} />;
        }
    });

    return (
        <>
            <h2>Numbers</h2>
            <ul>
            {...personEles}
            </ul>
        </>
    );
}

export default PersonList