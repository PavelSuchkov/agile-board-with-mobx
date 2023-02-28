import {flow, types} from "mobx-state-tree";
import apiCall from '../api'

const User = types.model('User', {
    id: types.union(types.identifier, types.identifierNumber),
    createdAt: types.string,
    name: types.string,
    avatar: types.string
})

const UsersStore = types.model('UsersStore', {
    users: types.maybe( types.array(User))  // may be undefined
}).actions(self => {
    return {
        load: flow( function* (){
            self.users = yield apiCall.get('users')
        }),
        afterCreate(){
            self.load()
        }
    }
})

export default UsersStore