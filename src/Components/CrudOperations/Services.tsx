import  sampleProducts  from "../../Configs/SampleProducts.json";

let data = [...sampleProducts];

const generateId = data =>
    data.reduce((acc, current) => Math.max(acc, current.EmployeeID), 0) + 1;

export const insertItem = item => {
    item.EmployeeID = generateId(data);
    item.inEdit = false;
    data.unshift(item);
    return data;
};

export const getItems = () => {
    return data;
};

export const updateItem = item => {
    let index = data.findIndex(record => record.EmployeeID === item.EmployeeID);
    data[index] = item;
    return data;
};

export const deleteItem = item => {
    let index = data.findIndex(record => record.EmployeeID === item.EmployeeID);
    data.splice(index, 1);
    return data;
};
