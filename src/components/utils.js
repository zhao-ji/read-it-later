export const Content = ({ content }) => {
    let title;
    try {
        title = JSON.parse(content).content;
    } catch(e){
        title = "error occured"
    }
    return title || "empty content";
}


export const Title = ({ content }) => {
    let title;
    try {
        title = JSON.parse(content).title;
    } catch(e){
        title = "error occured"
    }
    return title || "empty title";
}
