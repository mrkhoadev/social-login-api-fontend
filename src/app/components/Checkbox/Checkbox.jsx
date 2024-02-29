"use client";
import React, { useEffect } from "react";
import "./Checkbox.scss";
export default function Checkbox({ selected = false, id = 'all', data = [], checkAll, setCheckAll, selectArr, setSelectArr }) {
  const handleOnChange = (e, id) => {
    if (id === "all" && data.length > 0) {
      setSelectArr(() => {
        if (!checkAll) {
          return data.map((d) => d.id)
        } else {
          return []
        }
      });
      setCheckAll(!checkAll)
    } else {
      setSelectArr((state) => {
        if (!selected) {
          return Array.isArray(state) ? [...state, id] : [id];
        } else {
          return Array.isArray(state) ? state.filter(i => i !== id) : [];
        }
      });
      
    }
  }
  useEffect(() => {
      if (selectArr.length > 0 && data.length === selectArr.length) {
        setCheckAll(true)
      } else {
        setCheckAll(false)
      }
  },[selectArr, data, setCheckAll])
 
  return (
    <div className="container flex justify-center items-center">
      <input
        style={{ display: "none" }}
        id={"cbx-" + id}
        className="cbx"
        type="checkbox"
        onChange={(e) => handleOnChange(e, id)}
        checked={id !== "all" ? selected : checkAll}
      />
      <label className="check" htmlFor={"cbx-" + id}>
        <svg viewBox="0 0 18 18" height="18px" width="18px">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
  );
}
