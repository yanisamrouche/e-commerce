export default function Categories(props){

    const {setActiveCategory, categories, activeCategory} = props;
    return (
        <div className="row">
            <br/>
            <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}>
                <option value=''>All categories</option>
                {categories.map((cat)=>(
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>

    )


}