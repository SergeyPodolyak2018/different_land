
const getWindowMode = () => {
    let mode='desktop';
    if(window.innerWidth>950){
        mode='desktop'
    }else if(window.innerWidth<=950 && window.innerWidth>=460){
        mode='tablet'
    }else if(window.innerWidth<460){
        mode='mobile'
    }
    return mode
};
export default getWindowMode;
