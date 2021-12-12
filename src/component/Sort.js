import React from "react";

export default function SortForm({setSortKey,sortKey}){
    return<>
    <div className="sort_box">
    <label>Sort</label>
    <select defaultValue={sortKey}  onChange={(e)=>{
        setSortKey(e.target.value)
    }}>
    <option value="index">Index</option>
    <option value="category">Category</option>
    <option value="title">Name</option>
    </select>
    </div>
    </>
}