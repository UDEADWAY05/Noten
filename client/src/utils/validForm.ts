import { Dispatch, SetStateAction } from 'react';

interface State {
    login: string,
    password: string
} 


function validForm(
  state: State,
  setIsValid: Dispatch<SetStateAction<boolean>>
): void {
  const arr = Object.keys(state) as (keyof State)[];
  const allFieldsFilled = arr.every((el) => state[el].length > 0);

  setIsValid(allFieldsFilled);
}

export default validForm;