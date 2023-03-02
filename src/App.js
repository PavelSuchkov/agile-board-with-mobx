import useStore from "./hooks/useStore";
import {observer} from "mobx-react-lite";
import {getSnapshot} from "mobx-state-tree";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";


function App() {
    const {users, boards} = useStore()

    // console.log('users ===> ',users.toJSON())
    console.log('tasks ===> ', boards.active?.sections[0]?.tasks && getSnapshot(boards))

    return (
        <>
            <Header/>
            <main>
                <Dashboard/>
            </main>
        </>
    );
}

export default observer(App);
