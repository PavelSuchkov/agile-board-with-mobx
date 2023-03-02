import {flow, getParent, getSnapshot, types} from "mobx-state-tree";
import apiCall from '../api'
import {User} from "./users";
// import {User} from "../components/common/User";


const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.safeReference(User)
})

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task)
}).actions(self => {
    return {
        load: flow(function* () {
            const {id: boardID} = getParent(self, 2)
            const {id: status} = self
            const {tasks} = yield apiCall.get(`boards/${boardID}/tasks/${status}`)

            self.tasks = tasks
        }),
        afterCreate() {
            self.load()
        }
    }
})

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection)
}).actions(self => {
    return {
        moveTask(id, source, destination){
            // debugger
            const fromSection = self.sections.find(section => section.id === source.droppableId)
            console.log("fromSection ====>", getSnapshot(fromSection));
            const toSection = self.sections.find(section => section.id === destination.droppableId)
            console.log("toSection ====>", getSnapshot(toSection));

            const taskMoveIndex = fromSection.tasks.findIndex(task => task.id === id)

            console.log("taskMoveIndex ====>", taskMoveIndex);
            const [task] = fromSection.tasks.splice(taskMoveIndex, 1)
            console.log("task ====>", getSnapshot(task));
            toSection.tasks.splice(destination.index, 0, task.toJSON())
        }
    }
})

const BoardStore = types.model('BoardStore', {
    boards: types.optional( types.array(Board), []),
    active: types.safeReference(Board)
}).actions(self => {
    return {
        load: flow(function* () {
            self.boards = yield apiCall.get('boards')
            self.active = 'MAIN'
        }),
        afterCreate() {
            self.load()
        }
    }
}).views(self =>({
    get list(){
        return self.boards.map(({id, title}) => ({id, title}))
    }
}))

export default BoardStore