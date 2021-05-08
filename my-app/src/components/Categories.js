export default function Categories(props){

    const {setActiveCategory, categories, activeCategory} = props;
    return (
        <div className="row">
            <h5>Choose a category... </h5>
            <br/>
            <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}>
                <option value=''>-----</option>
                {categories.map((cat)=>(
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

        </div>

    )


}