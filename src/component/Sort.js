import React from "react";

export default function SortForm({setSortKey,sortKey}){
    return<>
    <label>Sort By</label>
    <select  onChange={(e)=>{
        setSortKey(e.target.value)
    }}>
    <option value="index" selected={sortKey=='index'?'selected':''}>Index</option>
    <option value="category" selected={sortKey=='category'?'selected':''}>Category</option>
    <option value="title" selected={sortKey=='title'?'selected':''}>Name</option>
    </select>
    </>
}