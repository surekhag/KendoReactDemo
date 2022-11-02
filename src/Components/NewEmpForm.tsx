import React, { useState, memo, useEffect } from 'react';
import { Form, Field, FormElement, FieldRenderProps, FormRenderProps } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
import { nameValidator, addressValidator, desnValidator, deptValidator } from "./Validators"
// import SharedButtons from "../SharedComps/SharedButtons"
import { Fade } from "@progress/kendo-react-animation";

const Styles = require("../Styles/NewEmpForm.css");
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);



// const emailValidator = (value: string) => (emailRegex.test(value) ? "" : "Please enter a valid email.");
// const EmailInput = (fieldRenderProps: FieldRenderProps) => {
//     const { validationMessage, visited, ...others } = fieldRenderProps;
//     return (
//         <div>
//             <Input {...others} />
//             {
//                 visited && validationMessage &&
//                 (<Error>{validationMessage}</Error>)
//             }
//         </div>
//     );
// };


const NameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, data, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} value={data} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const EmployeeForm = (props) => {
    const { setShow, setNotifyState, data, setState, add, application, edit, update, dataToEdit,setDataToEdit } = props;
    const [EmpName, setEmpName] = useState(dataToEdit && dataToEdit.EmployeeName);
    const [department, setDepartment] = useState(dataToEdit && dataToEdit.Department)
    const [designation, setDesignation] = useState(dataToEdit && dataToEdit.Designation)
    const [address, setAddress] = useState(dataToEdit && dataToEdit.Address)
    const handleSubmit = (dataItem: { [name: string]: any }) => {
        let name ,dept,desn,addr, checkedVal;
        if (application == "addNewRecord") {
            let temp = { ...dataItem, inEdit: true, Active: true }
            add(temp)
            setShow(false)
            setNotifyState({ success: true })
            const node = document.getElementById("clear")
            node.click();
        }
        if (application == "editRecord") {
            name = dataItem.EmployeeName ?  dataItem.EmployeeName : dataToEdit.EmployeeName
            dept=dataItem.Department? dataItem.Department : dataToEdit.Department;
            desn=dataItem.Designation? dataItem.Designation : dataToEdit.Designation;
            addr =dataItem.Address? dataItem.Address : dataToEdit.Address;
            checkedVal= dataItem.checked? dataItem.checked : dataToEdit.checked;
            let temp = { EmployeeID: dataToEdit && dataToEdit.EmployeeID,
                EmployeeName:name,
                Department: dept,
                Designation : desn,
                Address: addr,
                checked: checkedVal,
                 ...dataItem, inEdit: true, }
          
            //add all fields here ..
            update(temp)
            setShow(false)
            setNotifyState({ success: true })
            const node = document.getElementById("clear")
            node.click();
        }

    }

    const closeForm = () => {
        setShow(false);
        setDataToEdit(null);
    }


    return (<>
        <Form
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
                <FormElement style={{ maxWidth: 650 }}>
                    <div className="k-form-buttons close">
                        <Button onClick={closeForm}>X</Button>

                    </div>
                    <fieldset className={'k-form-fieldset'}>
                        <legend className={'k-form-legend addEmpHeader'}>
                            {application == "addNewRecord" ? "Add New Employee Details" : "Edit Employee Details"}
                        </legend>
                        <div className="mb-3">
                            <Field name={'EmployeeName'} component={NameInput}
                                data={EmpName}
                                label={'Employee Name'}
                                onChange={(value) => {
                                    setEmpName(value.value)
                                }}
                                validator={() => nameValidator(EmpName)} />
                        </div>

                        <div className="mb-3">
                            <Field name={'Designation'}
                                data={designation}
                                component={NameInput}
                                onChange={value => setDesignation(value.value)} label={'Designation'} validator={() => desnValidator(designation)} />
                        </div>
                        <div className="mb-3">
                            <Field name={'Address'}
                                data={address}
                                onChange={value => setAddress(value.value)} component={NameInput} label={'Address'} validator={() => addressValidator(address)} />
                        </div>
                        <div className="mb-3">
                            <Field name={'Department'}
                                data={department}
                                onChange={value => setDepartment(value.value)} component={NameInput} label={'Department'} validator={() => deptValidator(department)} />
                        </div>

                        {/* <div className="mb-3">
                            <Field name={"email"} type={"email"} component={EmailInput} label={"Email"}
                                validator={emailValidator} />
                        </div> */}
                    </fieldset>
                    <div className="k-form-buttons">


                        <Button
                            type={'submit'}
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            disabled={!formRenderProps.allowSubmit}
                            // onClick={() => { console.log("update", formRenderProps) }}
                        >
                            {application == "addNewRecord" ? "Add" : "Update"}
                        </Button>
                        
                        {application == "addNewRecord" ? <>
                        <Button id="clear" onClick={formRenderProps.onFormReset}>
                          Clear
                        </Button>
                        </> : <>
                        <Button id="clear" onClick={()=>
                            {
                                formRenderProps.onFormReset();
                                setShow(false)
                                // setDataToEdit(null)
                            }
                            }>
                           Cancel
                        </Button>
                        </>}

                       
                       

                    </div>
                </FormElement>
            )}
        />
    </>
    );
};
export default memo(EmployeeForm);