// ES2015 module syntax
import React, { useState, useEffect } from "react";
import {
    Grid,
    GridColumn,
    GridDataStateChangeEvent,
    GridItemChangeEvent,
    GridToolbar,
    GridCellProps
} from "@progress/kendo-react-grid";
import products from "../Configs/Products.json";
import '@progress/kendo-theme-default/dist/all.css';
import { process, State } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { MyCommandCell } from "../Components/CrudOperations/MyCommandCell";
import { Product } from "../Components/CrudOperations/Interfaces";

import { Fade } from "@progress/kendo-react-animation";

import {
    Notification,
    NotificationGroup,
} from "@progress/kendo-react-notification";

import { Popup } from "@progress/kendo-react-popup";
import { insertItem, getItems, updateItem, deleteItem } from "../Components/CrudOperations/Services";
import BasicForm from "../Components/BasicForm"
interface State1 {
    success: boolean;
}
const styles = require("../Styles/Grid.css");
const editField: string = "inEdit";

interface AppState {
    data: Product[]
}
const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0,
};
const ProductDetailsPdfExports = (): JSX.Element => {

    const anchor = React.useRef<HTMLButtonElement | null>(null);
    const [state, setState] = useState<AppState>({ data: [] })

    const [notifystate, setNotifyState] = React.useState<State1>({
        success: false
    });
    const { success } = notifystate;
    useEffect(() => {
        let data = getItems()
        setState({ data })
    }, [])

    let gridPDFExport: GridPDFExport | null;

    const exportPDF = () => {
        if (gridPDFExport !== null) {
            gridPDFExport.save();
        }
    };
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

    const cancel = (dataItem: Product) => {
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
        setShow(true)
        // setState({
        //     data: [newDataItem, ...state.data]
        // });
    };


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
    const [dataState, setDataState] = React.useState<State>(initialDataState);

    const [show, setShow] = React.useState(false);
    console.log("data", show)
    const GridComp =
        <Grid
            id="prods"
            pageable={true}
            style={{
                height: "400px",
            }}
            data={process(state.data, dataState)}
            {...dataState}
            onDataStateChange={(e: GridDataStateChangeEvent) => {
                setDataState(e.dataState);
            }}
            // data={state.data}
            onItemChange={itemChange}
            editField={editField}
        >
            <GridToolbar>
                <button
                    title="Export PDF"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={exportPDF}
                >
                    Export PDF
                </button>
                <button
                    title="Add new"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={addNew}
                    ref={anchor}
                >
                    Add new
                </button>
                <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
                    <BasicForm setShow={setShow} setNotifyState={setNotifyState}
                    data={state.data}
                    setState= {setState}
                    add={add} />
                </Popup>

                <NotificationGroup
                    style={{
                        right: 0,
                        top: "0",
                        alignItems: "flex-start",
                        flexWrap: "wrap-reverse",
                    }}
                >
                    <Fade>
                        {success && (
                            <Notification
                                type={{ style: "success", icon: true }}
                                closable={true}
                                onClose={() => setNotifyState({ success: false })}
                            >
                                <span>Form detail has been saved!</span>
                            </Notification>
                        )}
                    </Fade>
                </NotificationGroup>
            </GridToolbar>
            <GridColumn field="EmployeeID" title="ID" width="40px" editable={false} />
            <GridColumn field="EmployeeName" title="Employee Name" width="250px" />
            {/* <GridColumn field="Category.CategoryName" title="CategoryName" />
            <GridColumn field="UnitPrice" title="Price" />
            <GridColumn field="UnitsInStock" title="In stock" /> */}
            <GridColumn
                field="Designation"
                title="Designation"
                width="120px"
            />
            <GridColumn
                field="Address"
                title="Address"
                width="220px"
            />
            <GridColumn
                field="Department"
                title="Department"
                width="220px"
            />

            <GridColumn field="Active" title="Active" editor="boolean" />
            <GridColumn cell={CommandCell} width="200px" />
        </Grid>


    return (<div className="pagewrapper">
        <h3 className='headtext'> Employee Information</h3>
        {GridComp}
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {GridComp}
        </GridPDFExport>
    </div>);
}
export default ProductDetailsPdfExports;