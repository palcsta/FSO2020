import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const clear = () => {
        setValue('')
    }
    return {
        type,
        value,
        onChange,
        clear
    }

}

// moduulissa voi olla monta nimettyä eksportia
/*export const useAnotherHook = () => {  // ...
}*/