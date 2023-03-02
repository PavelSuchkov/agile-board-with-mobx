import {observer} from "mobx-react-lite";
import {AppBar, Box, FormControl, Grid, MenuItem, Select, Toolbar, Typography} from "@material-ui/core";
import useStore from "../../hooks/useStore";
import {User} from "../common/User";


const Header = () => {

    const {boards, users} = useStore()

    return (
        <AppBar position={"static"}>
            <Toolbar variant={'dense'}>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                    <Box style={{display: "flex", alignItems: "center"}}>
                        <Typography variant={"h6"}>
                            Dashboard
                        </Typography>
                        <FormControl>
                            <Select
                                style={{
                                    backgroundColor: '#fff',
                                    marginLeft: 10,
                                    borderRadius: 4,
                                    padding: 2
                                }}
                                value={boards?.active?.id || ""}
                                onChange={() => {
                                }}
                            >
                                <MenuItem value={''} disabled>-</MenuItem>
                                {boards.list.map(b => {
                                    return (
                                        <MenuItem key={b.id} value={b?.id}>{b?.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item>
                    <User user={users?.me}/>
                </Grid>
            </Toolbar>
        </AppBar>
    )

}

export default observer(Header)