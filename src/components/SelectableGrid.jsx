import React, { useState } from 'react'

const SelectableGrid = ({rows=10, cols=10}) => {

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBox, setSelectedBox] = useState([]);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  }

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBox([boxNumber]);
  }

  const handleMouseEnter = (boxNumber) => {
    if(isMouseDown){
      const startBox = selectedBox[0];
      console.log(startBox);
      const endBox = boxNumber;

      const startRow = Math.floor((startBox-1)/cols);
      const startCol = (startBox-1)%cols;
      const endRow = Math.floor((endBox-1)/cols);
      const endCol = (endBox-1)%cols;
      
      const minRow = Math.min(startRow, endRow);
      const minCol = Math.min(startCol, endCol);
      const maxRow = Math.max(startRow, endRow);
      const maxCol = Math.max(startCol, endCol);

      let selected = [];
      for(let i=minRow; i<=maxRow; i++){
        for(let j=minCol; j<=maxCol; j++){
          selected.push(i * cols + j + 1)
        }
      }
      setSelectedBox(selected)
      console.log(selected);
    }
  }

  return (
    <div className='grid' style={{"--rows": rows, "--cols": cols}} onMouseUp={handleMouseUp}>
      {[...Array(rows * cols).keys()].map((b,i) => {
        return <div key={i} className={`box ${selectedBox.includes(b+1) ? "select" : "null"}`}
        onMouseDown={() => handleMouseDown(b+1) }
        onMouseEnter={() => handleMouseEnter(b+1) }>{b+1}</div>
      })}
    </div>
  )
}

export default SelectableGrid 