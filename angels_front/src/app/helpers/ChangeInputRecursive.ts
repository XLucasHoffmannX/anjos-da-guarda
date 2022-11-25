export default function changeInputRecursive(e: any, state: any, changeState: any) {
    const { name, value } = e.target;
    changeState({ ...state, [name]: value });
}
