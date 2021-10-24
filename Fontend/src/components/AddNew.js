const AddNew = ({add, handleNum, handleName, newName, newNum }) => {

    return <form onSubmit={add}>
        <div>
            name: <input value={newName} onChange={handleName} />
        </div>
        <div>
            number: <input value={newNum} onChange={handleNum} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

}

export default AddNew;