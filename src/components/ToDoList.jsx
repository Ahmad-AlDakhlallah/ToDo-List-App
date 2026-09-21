
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// Components
import ToDo from '../ToDo.jsx';

// Others
import { useToast } from '../contexts/ToastContext.jsx';
import { v4 as uuid } from "uuid"
import { useEffect, useState, useContext, useMemo, useReducer } from 'react';
// import todosReducer from '../reducers/todosReducer.jsx'
// import { TodosContext } from '../contexts/todosContext.jsx';


// Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTodos } from '../contexts/todosContext.jsx';



export default function ToDoList() {

    const {todos, dispatch} = useTodos()

    

    const [titleInput, setTitleInput] = useState("")
    const [displayTodos, setDisplayTodo] = useState("all")

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [dialogTodo, setDialogTodo] = useState({
            title: todos.title,
            details: todos.details,
        })
        const {showHideToast} = useToast()



    const completed = useMemo(() => {
        return (
            todos.filter((todo) => {
                return todo.isCompleted
            })
        )
    }, [todos])
    const not_completed = useMemo(() => {
        return (
            todos.filter((todo) => {
                return !todo.isCompleted
            })
        )
    }, [todos])

    let todosToDisplayed = todos
    if (displayTodos == "completed") {
        todosToDisplayed = completed
    } else if (displayTodos == "not_Completed") {
        todosToDisplayed = not_completed
    }

    function handelAddClick() {
        setTitleInput("")
        showHideToast("تم الاضافة بنجاح")
        dispatch({type: "add", payload: {
            title: titleInput
        }})
    }
    function showEditDialog(todo) {
        setDialogTodo(todo)
        setOpenEditDialog(true)
    }
    function showDeleteDialog (todo){
        setDialogTodo(todo)
        setOpenDeleteDialog(true)
    }
    // Dialog Handlers
    function handleDeleteConfirm() {
        dispatch({type: "delete", payload: {
            id : dialogTodo.id
        }})
        setOpenDeleteDialog(false)
        showHideToast("تم الحذف ")
    }
    function handleEditConfirm(event) {
        event.preventDefault();
        dispatch({type: "edit", payload:{
            title: dialogTodo.title,
            details: dialogTodo.details,
            id: dialogTodo.id
        }})
        setOpenEditDialog(false)
        showHideToast("تم التعديل")
    }

    // Dialogs
    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };


    function handleChangeDisplayType(event) {
        setDisplayTodo(event.target.value)
    }

    useEffect(() => {
        dispatch({type: "get"})
    }, [])
    // [] => dependencies  يعني كل ما يتغير العنصر يلي داخل هذه المصفوفة بستدعي الفنكشن يلي جنبها
    // بما انها فاضية فهو بستدعيها بس وقت يحمل الكمبوننتس يعني تستدعى مرة واحدة بس يكتمل تحميل الكمبوننت
    //  بستخدمه وقت  اشتغل على API Requests, cookies, localStorage


    const todosJsx = todosToDisplayed.map((todo) => {
        return <ToDo key={todo.id} todo={todo} showEditDialog={showEditDialog}  showDeleteDialog={showDeleteDialog} />
    })

    return (
        <>

{/* Delete Dialog */}
            <Dialog
                open={openDeleteDialog}

                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من رغبتك في حذف المهمة؟
                </DialogTitle>
                <DialogContent style={{ direction: "rtl" }}>
                    <DialogContentText id="alert-dialog-description">
                        لا يمكنك التراجع عن الحذف بعد إتمامه.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        نعم قم بالحذف
                    </Button>
                </DialogActions>
            </Dialog>
            {/* /Delete Dialog/ */}

            {/* Edit Dialog */}
            <Dialog open={openEditDialog} style={{ direction: "rtl" }} onClose={handleCloseEdit}>
                <DialogTitle>تعديل مهمة</DialogTitle>

                <form onSubmit={handleEditConfirm} style={{ padding: "20px" }} id="subscription-form">
                    <TextField
                        value={dialogTodo.title}
                        onChange={(event) => {
                            setDialogTodo({ ...dialogTodo, title: event.target.value })
                        }}
                        autoFocus
                        margin="dense"
                        id='name'
                        label="العنوان"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={dialogTodo.details}
                        onChange={(event) => {
                            setDialogTodo({ ...dialogTodo, details: event.target.value })
                        }}
                        margin="dense"
                        id='name'
                        label="التفاصيل "
                        fullWidth
                        variant="standard"
                    />
                </form>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>إغلاق</Button>
                    <Button onClick={handleEditConfirm} form="subscription-form">
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
            {/* /Edit Dialog/ */}

            <Container maxWidth="sm" >
                <Card sx={{ minWidth: 275 }} style={{ textAlign: "center", maxHeight: "90vh", overflow: "scroll", overflowX: "hidden", color: "primary" }} >
                    <CardContent>
                        <Typography variant='h1'>
                            مهامي
                        </Typography>
                        <Divider />
                        {/* Start Filter Buttons */}
                        <ToggleButtonGroup style={{ direction: "ltr", marginTop: "25px" }}
                            color="primary"
                            value={displayTodos}
                            exclusive
                            onChange={handleChangeDisplayType}
                            aria-label="Platform"
                        >
                            <ToggleButton value="not_Completed">غير منجز</ToggleButton>
                            <ToggleButton value="completed">منجز</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {/* End Filter Buttons */}

                        {/* Start ToDos */}
                        {todosJsx}
                        {/* End ToDos */}

                        <Grid container spacing={2} style={{ marginTop: "20px" }} >
                            <Grid size={8}>
                                <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" value={titleInput} onChange={(event) => {
                                    setTitleInput(event.target.value)
                                }} style={{}} />
                            </Grid>
                            <Grid size={4} display='flex' justifyContent='space-around' alignItems='center' backgroundColor="red">


                                <Button variant="contained"
                                    style={{ display: "flex", justifyContent: "space-around", width: "100%", height: "100%", fontSize: "20px" }} endIcon={<AddIcon />} onClick={handelAddClick} disabled={titleInput.length == 0} >
                                    اضافة
                                </Button>


                            </Grid>
                        </Grid>



                    </CardContent>

                </Card>
            </Container>
        </>
    );
}