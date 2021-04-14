import React,{useEffect,useState} from "react";
import {Container,Typography,Grid,AppBar,Grow} from "@material-ui/core"
import memories from "../src/images/memories.jpeg";
import Posts from "../src/components/Posts/Posts";
import {useDispatch,useSelector} from "react-redux"
import Form from "../src/components/Form/Form";
import useStyles from "./styles";
import {getPosts} from "./actions/posts"

const App=()=>{
    const [currentId,setCurrentId]=useState(null);
    const styles = useStyles();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return (
        
        <Container maxWidth="lg">
            <AppBar className={styles.appBar} position="static" color="inherit">
                <Typography className={styles.heading} variant="h2">Vipin Jaluthria</Typography>
                <img className={styles.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container >
                    <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                    <Posts currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>

                    </Grid>
                </Container>
            </Grow>
            

        </Container>
    )
}
export default App;