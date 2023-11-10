import React from "react";

function Categories(){
    return(
        <div>
            <h2>Categories</h2>
            <form >
                <div className="FormRow">
                    <label>Category: </label>
                    <input name='username'/>
                </div>

                <button type="search" > Login </button>
            </form>
        </div>
    )
}
export default Categories;