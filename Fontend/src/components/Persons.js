const Persons = ({ persons, remove }) => {

    return (
        <ul>
            {persons.map(person => <div key={person.number}>{person.name} {person.number}<button onClick={() => remove({person})}>Delete</button></div>)}
        </ul>
    )
}

export default Persons;
