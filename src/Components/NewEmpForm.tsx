import React, { useState, memo } from 'react';
import { Form, Field, FormElement, FieldRenderProps, FormRenderProps } from '@progress/kendo-react-form';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
import {nameValidator, addressValidator, desnValidator, deptValidator} from "./Validators"
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
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {
                visited && validationMessage &&
                (<Error>{validationMessage}</Error>)
            }
        </div>
    );
};

const BasicForm = (props) => {
    const { setShow, setNotifyState, data, setState, add,application, edit, update, discard,dataToEdit } = props;
    console.log("form ptop", dataToEdit)
    const [isDisplayed, setIsDisplayed] = useState(false);

    const handleSubmit = (dataItem: { [name: string]: any }) => {

        if(application=="addNewRecord"){
        let temp = { ...dataItem, inEdit: true, Active: true }
        add(temp)
        setShow(false)
        setNotifyState({ success: true })
        const node = document.getElementById("clear")
        node.click();
    }
    if(application=="editRecord"){

    }

    }

    const closeForm = () => {
        setShow(false);
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
                            {application=="addNewRecord" ? "Add New Employee Details" :"Edit Employee Details"}
                             </legend>
                        <div className="mb-3">
                            <Field name={'EmployeeName'} component={NameInput} label={'Employee Name'}
                                validator={nameValidator} />
                        </div>

                        <div className="mb-3">
                            <Field name={'Designation'} component={NameInput} label={'Designation'} validator={desnValidator} />
                        </div>
                        <div className="mb-3">
                            <Field name={'Address'} component={NameInput} label={'Address'} validator={addressValidator} />
                        </div>
                        <div className="mb-3">
                            <Field name={'Department'} component={NameInput} label={'Department'} validator={deptValidator} />
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
                        >
                            {application=="addNewRecord" ?  "Add" : "Update"}
                        </Button>

                        <Button id="clear" onClick={formRenderProps.onFormReset}>Clear</Button>
                        {/* <Button onClick={closeForm}>Close</Button> */}

                    </div>
                </FormElement>
            )}
        />
    </>
    );
};
export default memo(BasicForm);