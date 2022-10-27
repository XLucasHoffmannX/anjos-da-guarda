export default function changeInputRecursive(e: any, state: any, changeState: any) {
    const { name, value } = e.target;
    console.log({[name]: value});
    changeState({ ...state, [name]: value });
}
