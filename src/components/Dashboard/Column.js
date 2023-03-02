import {Draggable} from "react-beautiful-dnd";
import {Card} from "@material-ui/core";
import {Task} from "./Task";
import {observer} from "mobx-react-lite";

const getListStyle = (draggableStyle) => {
    return {
        padding: 8,
        marginBottom: 8,
        ...draggableStyle
    }
}
 const Column = ({section}) => {
    return (
        <div>
            {section?.tasks?.map((task, index) => {
                return (
                    <Draggable draggableId={task.id} key={task.id} index={index}>
                        {(provided) => (
                            <Card
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                style={getListStyle(provided.draggableProps.style)}
                            >
                                <Task task={task} />
                            </Card>
                        )}
                    </Draggable>
                )
            })}
        </div>
    )
}

export default observer(Column)