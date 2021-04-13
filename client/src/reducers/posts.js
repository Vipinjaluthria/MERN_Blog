const reducer=(posts=[],action)=>{
    switch (action.type) {
        case "FETCH_ALL":
        return action.payload;
        break;
        case "CREATE":
            return [...posts,action.payload];
        default:
            return posts;
            break;
    }

}
export default reducer;