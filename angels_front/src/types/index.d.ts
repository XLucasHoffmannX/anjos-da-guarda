export { };

declare global {
    interface Window {
        Echo: any; // whatever type you want to give. (any,number,float etc)
        Pusher: any; // whatever type you want to give. (any,number,float etc)
    }
}