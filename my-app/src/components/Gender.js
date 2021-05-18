export default function Gender(props){

    const {setActiveGender, genders, activeGender} = props;
    return (
        <div className="row">

            <br/>
            <select
                value={activeGender}
                onChange={(e) => setActiveGender(e.target.value)}>
                <option value=''>-----</option>
                {genders.map((cat)=>(
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>

    )


}