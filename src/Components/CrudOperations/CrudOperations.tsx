import React, {useState, useEffect} from "react";
import * as ReactDOM from "react-dom";
import {
    Grid,
    GridCellProps,
    GridColumn as Column,
    GridItemChangeEvent,
    GridToolbar
} from "@progress/kendo-react-grid";
const styles = require("../../Styles/Grid.css");
import { MyCommandCell } from "./MyCommandCell";
import { insertItem, getItems, updateItem, deleteItem } from "./Services";
import { Product } from "./Interfaces";

const editField: string = "inEdit";

interface AppState {
    data: Product[]
}

function CrudOperations () {
    const [state, setState]= useState<AppState>({data:[]})
    
    useEffect(()=>{
        let data= getItems()
        setState({data})
    },[])
    const CommandCell = (props: GridCellProps) => (
      <MyCommandCell
        {...props}
        edit={enterEdit}
        remove={remove}
        add={add}
        discard={discard}
        update={update}
        cancel={cancel}
        editField={editField}
        />
    );

    // modify the data in the store, db etc
    const remove = (dataItem: Product) => {
        const data = deleteItem(dataItem);
        setState({ data });
    };

    const add = (dataItem: Product) => {
        dataItem.inEdit = true;

        const data = insertItem(dataItem);
        setState({
            data: data
        });
    };

    const update = (dataItem: Product) => {
        dataItem.inEdit = false;
        const data = updateItem(dataItem);
        setState({ data });
    };

    // Local state operations
    const discard = () => {
        const data = [...state.data];
        data.splice(0, 1)
        setState({ data });
    };

    const  cancel = (dataItem: Product) => {
        const originalItem = getItems().find(
            p => p.EmployeeID === dataItem.EmployeeID
        );
        const data = state.data.map(item =>
            item.EmployeeID === originalItem.EmployeeID ? originalItem : item
        );

        setState({ data });
    };

    const enterEdit = (dataItem: Product) => {
        setState({
            data: state.data.map(item =>
                item.EmployeeID === dataItem.EmployeeID ? { ...item, inEdit: true } : item
            )
        });
    };

    const itemChange = (event: GridItemChangeEvent) => {
        const data = state.data.map(item =>
            item.EmployeeID === event.dataItem.EmployeeID
                ? { ...item, [event.field || '']: event.value }
                : item
        );

        setState({ data });
    };

    const addNew = () => {
        const newDataItem = { inEdit: true, Active: false };

        setState({
            data: [newDataItem, ...state.data]
        });
    };

    
const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0,
};

        return (
            <div className="pagewrapper">
            <h3 className='headtext'> Employee Information</h3>
          <Grid
            style={{ height: "420px" }}
            data={state.data}
            onItemChange={itemChange}
            editField={editField}
            >
            <GridToolbar>
              <button
                title="Add new"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                onClick={addNew}
                    >
                Add new
              </button>
            </GridToolbar>
            <Column field="EmployeeID" title="Id" width="50px" editable={false} />
            <Column field="EmployeeName" title="Employee Name" width="200px" />
            {/* <Column
              field="FirstOrderedOn"
              title="First Ordered"
              editor="date"
              format="{0:d}"
              width="150px"
                /> */}
            {/* <Column
              field="UnitsInStock"
              title="Units"
              width="120px"
              editor="numeric"
                /> */}
                 <Column
              field="Designation"
              title="Designation"
              width="120px"
                />
                 <Column
              field="Address"
              title="Address"
              width="120px"
                />
                 <Column
              field="Department"
              title="Department"
              width="120px"
                />
                
            <Column field="Active" title="Active" editor="boolean" />
            <Column cell={CommandCell} width="200px" />
          </Grid>
          </div>
        );
    
}

export default CrudOperations;