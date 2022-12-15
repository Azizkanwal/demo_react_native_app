import React, {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Select = (props: any) => {
    const [open, setOpen] = useState();
    return (<DropDownPicker {...props}
                            open={open}
                            setOpen={setOpen}/>)
}

export default Select;