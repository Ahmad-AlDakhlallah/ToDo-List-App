import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';


import { useTodos } from './contexts/todosContext';
import { useToast } from './contexts/ToastContext';



export default function ToDo({ todo, showEditDialog, showDeleteDialog }) {
    const { todos, dispatch } = useTodos()
    const {showHideToast} = useToast()


    function handelCheckClick() {
        dispatch({type: "toggledCompleted", payload: {
            id: todo.id
        }})
        showHideToast("تم التعديل بنجاح")
    }

    // Dialog
    
    function handleClickOpenEdit() {
        showEditDialog(todo)
    }

    function handleClickOpenDeleteDialog(){
        showDeleteDialog(todo)
    }

    return (
        <>
            <Card className='todoCard' sx={{ minWidth: 275 }} style={{ backgroundColor: "#283593", color: "white", marginTop: "20px" }} >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography variant='h5' style={{ textAlign: "right", textDecoration: todo.isCompleted && "line-through" }}>
                                {todo.title}
                            </Typography>
                            <Typography variant='h6' style={{ textAlign: "right", textDecoration: todo.isCompleted && "line-through" }}>
                                {todo.details}
                            </Typography>
                        </Grid>
                        <Grid size={4} display='flex' justifyContent='space-around' alignItems='center'>
                            {/* Action Icons */}
                            {/* Check Icon Button */}
                            <IconButton className="iconBtn" onClick={() => { handelCheckClick() }} aria-label="check" style={{ color: todo.isCompleted ? "white" : "#8bc34a", backgroundColor: todo.isCompleted ? "#8bc34a" : "white", border: "solid #9fcf4f 3px" }} >
                                <CheckIcon />
                            </IconButton>
                            {/* /Check Icon Button/ */}

                            {/* Edit Icon Button */}
                            <IconButton className="iconBtn" aria-label="delete" style={{ color: "#1769aa", backgroundColor: "white", border: "solid #2f6faf 3px" }}>
                                <EditIcon 
                                onClick={handleClickOpenEdit} 
                                />
                            </IconButton>
                            {/* /Edit Icon Button/ */}

                            {/* Delete Icon Button */}
                            <IconButton onClick={handleClickOpenDeleteDialog}
                                className="iconBtn" aria-label="delete" style={{ color: "#cf3f2f", backgroundColor: "white", border: "solid #bf3f1f 3px" }}>
                                <DeleteIcon />
                            </IconButton>
                            {/* /Edit Icon Button/ */}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}